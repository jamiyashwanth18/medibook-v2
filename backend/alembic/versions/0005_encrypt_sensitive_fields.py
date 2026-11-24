"""Encrypts users.full_name and doctor_profiles.credentials at rest (US-022, AC-055).

Widens both columns first, since Fernet ciphertext is longer than the plaintext it
replaces, then rewrites every existing row through `app.encryption` so data a previous
sprint wrote in the clear is protected the same way a row written from now on is.

Revision ID: 0005
Revises: 0004
"""

import sqlalchemy as sa
from alembic import op

from app.encryption import decrypt_value, encrypt_value

revision: str = "0005"
down_revision: str | None = "0004"
branch_labels: str | None = None
depends_on: str | None = None

_users = sa.table("users", sa.column("id", sa.String), sa.column("full_name", sa.String))
_doctor_profiles = sa.table(
    "doctor_profiles", sa.column("id", sa.String), sa.column("credentials", sa.String)
)


def upgrade() -> None:
    op.alter_column("users", "full_name", type_=sa.String(1024), existing_nullable=False)
    op.alter_column(
        "doctor_profiles", "credentials", type_=sa.String(1024), existing_nullable=False
    )

    bind = op.get_bind()
    for row in bind.execute(sa.select(_users.c.id, _users.c.full_name)):
        bind.execute(
            _users.update()
            .where(_users.c.id == row.id)
            .values(full_name=encrypt_value(row.full_name))
        )
    for row in bind.execute(sa.select(_doctor_profiles.c.id, _doctor_profiles.c.credentials)):
        bind.execute(
            _doctor_profiles.update()
            .where(_doctor_profiles.c.id == row.id)
            .values(credentials=encrypt_value(row.credentials))
        )


def downgrade() -> None:
    bind = op.get_bind()
    for row in bind.execute(sa.select(_users.c.id, _users.c.full_name)):
        bind.execute(
            _users.update()
            .where(_users.c.id == row.id)
            .values(full_name=decrypt_value(row.full_name))
        )
    for row in bind.execute(sa.select(_doctor_profiles.c.id, _doctor_profiles.c.credentials)):
        bind.execute(
            _doctor_profiles.update()
            .where(_doctor_profiles.c.id == row.id)
            .values(credentials=decrypt_value(row.credentials))
        )

    op.alter_column("users", "full_name", type_=sa.String(200), existing_nullable=False)
    op.alter_column(
        "doctor_profiles", "credentials", type_=sa.String(255), existing_nullable=False
    )
