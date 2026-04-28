# Monitoring Verification

## Basic checks

- Verify `GET /` returns HTTP 200.
- Verify `GET /catalog` returns HTTP 200.
- Check once every 5 minutes.
- Trigger alert after 2 consecutive failures.

## Deployment metadata

Record in your monitoring dashboard:
- Deployment timestamp
- Commit SHA
- Active environment URL
