"""Adds specializations, doctor_profiles and doctor_specializations (US-003).

Revision ID: 0004
Revises: 0003
"""

import sqlalchemy as sa
from alembic import op

revision: str = "0004"
down_revision: str | None = "0003"
branch_labels: str | None = None
depends_on: str | None = None


def upgrade() -> None:
    op.create_table(
        "specializations",
        sa.Column("id", sa.String(36), primary_key=True, nullable=False),
        sa.Column("name", sa.String(100), nullable=False, unique=True),
    )
    op.create_table(
        "doctor_profiles",
        sa.Column("id", sa.String(36), primary_key=True, nullable=False),
        sa.Column(
            "user_id", sa.String(36), sa.ForeignKey("users.id"), nullable=False, unique=True
        ),
        sa.Column("credentials", sa.String(255), nullable=False),
    )
    op.create_table(
        "doctor_specializations",
        sa.Column(
            "doctor_profile_id",
            sa.String(36),
            sa.ForeignKey("doctor_profiles.id"),
            primary_key=True,
            nullable=False,
        ),
        sa.Column(
            "specialization_id",
            sa.String(36),
            sa.ForeignKey("specializations.id"),
            primary_key=True,
            nullable=False,
        ),
    )


def downgrade() -> None:
    op.drop_table("doctor_specializations")
    op.drop_table("doctor_profiles")
    op.drop_table("specializations")
