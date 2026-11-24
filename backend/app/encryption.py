"""Application-level encryption for sensitive data at rest (US-022, AC-055).

Wraps a value with Fernet (AES-128-CBC plus an HMAC, both keyed by `ENCRYPTION_KEY`),
and exposes it as a SQLAlchemy column type (`EncryptedString`) so a column mapped with
it is encrypted the moment it is written and decrypted transparently whenever the ORM
reads it back: nothing that reads or writes the model has to change.

`ENCRYPTION_KEY` is a urlsafe-base64, 32-byte Fernet key (generate one with
`python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"`,
see .env.example). A real deployment sets it like any other secret (BOOTSTRAP_ADMIN_PASSWORD,
DATABASE_URL). When it is not set -- a fresh local clone, the test suite -- a random key is
generated once for the life of the process instead of failing outright, so encryption still
works; nothing encrypted with it survives a restart, which is fine for a database nobody
expects to keep, and exactly why a real deployment must set the setting itself.
"""

import os
from functools import lru_cache

from cryptography.fernet import Fernet, InvalidToken
from sqlalchemy.types import String, TypeDecorator


@lru_cache(maxsize=1)
def _fernet() -> Fernet:
    key = os.getenv("ENCRYPTION_KEY", "").strip()
    if not key:
        key = Fernet.generate_key().decode()
    return Fernet(key.encode())


def reset_fernet_cache() -> None:
    """Forget the cached key, so the next call picks up a new `ENCRYPTION_KEY`.

    Only a test that changes `ENCRYPTION_KEY` mid-run needs this; the app never calls it.
    """
    _fernet.cache_clear()


def encrypt_value(plaintext: str | None) -> str | None:
    """Encrypt `plaintext` for storage. `None` passes through unchanged, so an optional
    column stays optional."""
    if plaintext is None:
        return None
    return _fernet().encrypt(plaintext.encode()).decode()


def decrypt_value(ciphertext: str | None) -> str | None:
    """Decrypt a value `encrypt_value` produced. `None` passes through unchanged."""
    if ciphertext is None:
        return None
    try:
        return _fernet().decrypt(ciphertext.encode()).decode()
    except InvalidToken as exc:
        raise ValueError(
            "Value is not valid ciphertext for the configured ENCRYPTION_KEY."
        ) from exc


class EncryptedString(TypeDecorator):
    """A `String` column whose value is encrypted in the database and decrypted on read.

    Ciphertext is longer than the plaintext it came from, so `impl` is sized generously
    rather than matched to the plaintext's own limit. `cache_ok` tells SQLAlchemy this
    type's behaviour depends only on its bind parameter, not on any mutable state, so a
    statement that uses it can be compiled once and cached like any other.
    """

    impl = String(1024)
    cache_ok = True

    def process_bind_param(self, value: str | None, dialect: object) -> str | None:
        return encrypt_value(value)

    def process_result_value(self, value: str | None, dialect: object) -> str | None:
        return decrypt_value(value)
