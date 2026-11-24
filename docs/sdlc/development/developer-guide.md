# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `5738a62` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
MediBook V2 is a generated healthcare appointment management platform, split into two independently generated applications in one repo: a Vite + React 19 single-page frontend that implements the approved screen designs against seeded sample data, and a FastAPI 0.115 backend that currently only has its health check and a login/auth flow implemented, with every other route scaffolded as a typed stub (StubResponse) until an architecture is implemented. The backend persists through SQLAlchemy models with schema managed by Alembic migrations (run automatically on startup), defaulting to a local SQLite file but designed to point at PostgreSQL 16 via DATABASE_URL. The frontend talks to the API exclusively through a generated OpenAPI client (src/api/client.ts), regenerated from the backend's OpenAPI document.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (for Vite 6 / React 19 frontend tooling)
- Python 3.12 (matches backend/Dockerfile)
- pip
- Docker and Docker Compose (optional, to run the PostgreSQL 16 database defined in docker-compose.yml)
- PostgreSQL 16 (required for running backend/pytest per TESTING.md; SQLite is used for local dev only)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository.
2. Copy .env.example to .env and set values as needed for your environment.
3. (Optional) From the repo root, run `docker compose up -d db` to start the PostgreSQL 16 database defined in docker-compose.yml.
4. cd backend && pip install -r requirements.txt
5. Start the backend once to confirm it boots: `uvicorn app.main:app --reload` (this applies Alembic migrations and seeds initial users on startup).
6. In a second terminal, cd frontend && npm install
7. Run `npm run dev` to start the frontend; it defaults to calling the backend at http://localhost:8000 unless VITE_API_BASE_URL is set.
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| backend dev server | `cd backend && uvicorn app.main:app --reload` | Runs the FastAPI app with auto-reload; applies migrations and seeds users via the lifespan hook on startup. |
| frontend dev server | `cd frontend && npm run dev` | Starts the Vite dev server for the React SPA. |
| frontend build | `cd frontend && npm run build` | Bundles the app with Vite; does not typecheck (see npm run typecheck). |
| frontend preview | `cd frontend && npm run preview` | Serves the production build locally. |
| start database | `docker compose up -d db` | Starts the PostgreSQL 16 container defined in docker-compose.yml, with a healthcheck via pg_isready. |
| regenerate API client | `cd frontend && npm run gen:api` | Exports the backend's OpenAPI schema and regenerates the typed client in src/api/schema.ts; requires a backend Python venv at backend/.venv (or set PYTHON). |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `.devcontainer` | Dev container configuration for a consistent local development environment. |
| `.github` | CI workflows, including the SonarQube scan workflow. |
| `.quorq` | Quorq AI SDLC platform metadata (handoff state, Sonar scan request trigger file). |
| `backend` | FastAPI service: app code, database migrations, scripts, and tests. |
| `backend/app` | Application code: entrypoint (main.py), models, schemas, auth, database setup, routers, seeding. |
| `backend/alembic` | Alembic migration environment and versioned migration scripts; the schema source of truth. |
| `backend/scripts` | Utility scripts: exporting the OpenAPI schema and a smoke test script. |
| `backend/tests` | Pytest suite split into unit/ and integration/ tests, plus shared fixtures in conftest.py. |
| `frontend` | Vite + React 19 single-page app implementing the approved screen designs. |
| `frontend/src` | App source: screens, navigation shell, generated API client (src/api), shared UI/icon library (src/lib), entrypoint (main.tsx). |
| `frontend/e2e` | Playwright end-to-end acceptance test specs and support helpers. |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routes are organized one router per architecture component (backend/app/routers/), with unimplemented endpoints returning a typed StubResponse placeholder rather than failing, so the service always has a complete OpenAPI document.
- All Pydantic request/response models extend ApiModel (app/api_model.py) so their JSON fields are camelCase.
- Database schema changes go through Alembic migrations (backend/alembic/versions/), never SQLAlchemy create_all; the app applies migrations automatically at startup via prepare_database().
- Each request gets its own SQLAlchemy session via the get_db dependency (app/database.py), closed after the request.
- Frontend screens live one module per approved screen and make API calls only through the generated client in src/api/client.ts (regenerated with npm run gen:api), never raw fetch.
- Frontend session token is stored in localStorage and sent as a bearer token ahead of a shared project-id bearer (frontend/src/lib/api.ts).
- Frontend styling uses Tailwind CSS v4 via the @tailwindcss/vite plugin, with shared UI/icon primitives in src/lib/ui.tsx and src/lib/icons.tsx.
- Both backend (pytest) and frontend (Vitest, Playwright) write JUnit XML reports to fixed reports/ or test-results/ folders for the platform's test dashboard.
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| backend unit/integration tests | `cd backend && pytest` | Runs the pytest suite (tests/unit, tests/integration); requires PostgreSQL per TESTING.md and writes a JUnit report to reports/junit/pytest.xml. |
| backend lint | `cd backend && ruff check .` | Lints the backend Python code with Ruff. |
| backend format check | `cd backend && ruff format .` | Formats backend Python code with Ruff. |
| frontend unit tests | `cd frontend && npm test` | Runs Vitest component tests under src/, with coverage and a JUnit report in reports/junit/vitest.xml. |
| frontend lint | `cd frontend && npm run lint` | Runs ESLint over the frontend; this is the gate the platform runs during development. |
| frontend typecheck | `cd frontend && npm run typecheck` | Runs tsc --noEmit; not run by npm run build, so worth running separately. |
| frontend e2e tests | `cd frontend && npm run test:e2e:install && npm run test:e2e` | Installs the Chromium browser then runs Playwright specs from e2e/; without E2E_BASE_URL it boots the backend (from backend/.venv) and a production frontend build itself. |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Backend fails to start with 'alembic.ini is missing beside app/' | Ensure alembic.ini and the alembic/ directory are present next to backend/app (both are copied into the Docker image); don't delete or move them. |
| `pytest` can't import `app` or test collection fails from the backend directory | Run pytest from backend/ so pytest.ini's `pythonpath = .` takes effect, and ensure a PostgreSQL database is available as described in TESTING.md. |
| Frontend can't reach the backend, or browser blocks requests with a CORS error | Set the backend's ALLOWED_ORIGINS environment variable to include the frontend's origin (defaults to the local Vite dev server origins only). |
| `npm run build` succeeds but the app doesn't actually typecheck | Run `npm run typecheck` (tsc --noEmit) separately, since build does not typecheck by design. |
| `npm run test:e2e` fails to start the backend webServer | Create and populate backend/.venv with the backend's requirements before running e2e tests, since Playwright's webServer invokes backend/.venv/bin/python directly. |
<!-- sdlc:auto:end troubleshooting -->
