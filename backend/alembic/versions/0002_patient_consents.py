"""Adds users.full_name and the patient_consents table (US-001).

Revision ID: 0002
Revises: 0001
"""

import sqlalchemy as sa
from alembic import op

revision: str = "0002"
down_revision: str | None = "0001"
branch_labels: str | None = None
depends_on: str | None = None


def upgrade() -> None:
    # A temporary default fills in the column for rows the previous migration or the
    # seed script already created; the column itself has none afterwards; new rows
    # always name a full name.
    op.add_column(
        "users",
        sa.Column("full_name", sa.String(200), nullable=False, server_default=""),
    )
    op.alter_column("users", "full_name", server_default=None)

    op.create_table(
        "patient_consents",
        sa.Column("id", sa.String(36), primary_key=True, nullable=False),
        sa.Column("user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False),
        sa.Column("consent_given", sa.Boolean(), nullable=False),
        sa.Column("consent_date", sa.DateTime(timezone=True), nullable=False),
        sa.Column("consent_text_version", sa.String(50), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("patient_consents")
    op.drop_column("users", "full_name")
