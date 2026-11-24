# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| Web SPA Origin | S3 + CloudFront (static hosting) | React 19 static build | CDN edge, static | dev |
| API Service | AWS ECS Fargate (or EC2) behind ALB | FastAPI 0.115 on Python / Uvicorn | 1-2 small tasks, single-clinic scale | dev |
| Database | Amazon RDS for PostgreSQL | PostgreSQL 16, Mumbai (ap-south-1) region | single instance, correctness-first | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_Web_SPA_Origin["Web SPA Origin<br/>S3 + CloudFront (static hosting)"]
  n_API_Service["API Service<br/>AWS ECS Fargate (or EC2) behind ALB"]
  n_Database["Database<br/>Amazon RDS for PostgreSQL"]
  n_Web_SPA_Origin -->|"HTTPS"| n_API_Service
  n_API_Service -->|"TLS (PostgreSQL wire protocol over TLS)"| n_Database
```
<!-- sdlc:auto:end topology -->
