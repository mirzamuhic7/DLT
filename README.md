# DLT Portal

```
npm install
cp .env.example .env.local
npm run dev
```

Deploy to Azure Static Web Apps:
```
az staticwebapp create -n dlt-portal -s . -b main
```
