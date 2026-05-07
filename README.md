# Dashboard Comercial — Kommo + IA

Dashboard inteligente para clínicas de estética com integração direta ao Kommo CRM.

## Como publicar no Vercel (passo a passo)

### 1. Suba para o GitHub

1. Acesse [github.com](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde)
3. Nome do repositório: `kommo-dashboard`
4. Deixe como **Public** e clique em **"Create repository"**
5. Na tela seguinte, clique em **"uploading an existing file"**
6. Arraste os dois arquivos desta pasta: `index.html` e `vercel.json`
7. Clique em **"Commit changes"**

### 2. Deploy no Vercel

1. Acesse [vercel.com](https://vercel.com) e clique em **"Sign up"**
2. Escolha **"Continue with GitHub"** — autorize o acesso
3. Na dashboard do Vercel, clique em **"Add New Project"**
4. Encontre o repositório `kommo-dashboard` e clique em **"Import"**
5. Deixe todas as configurações padrão e clique em **"Deploy"**
6. Aguarde ~1 minuto — o Vercel vai gerar sua URL no formato:
   ```
   https://kommo-dashboard-xxxx.vercel.app
   ```

### 3. Configure o Kommo

1. Acesse sua conta Kommo → **Configurações → Integrações**
2. Abra sua integração e edite o **Redirect URI** para:
   ```
   https://kommo-dashboard-xxxx.vercel.app/
   ```
   (use a URL exata que o Vercel gerou, com a barra no final)

### 4. Use o dashboard

1. Abra sua URL do Vercel
2. A URL de Redirect será exibida automaticamente na tela de login
3. Preencha subdomínio, Client ID e Client Secret
4. Clique em **"Conectar com Kommo"**
5. Autorize na janela que abrir
6. Pronto! O dashboard carrega automaticamente

## Recursos

- ✅ Login OAuth automático com Kommo
- ✅ Token salvo no navegador (não precisa logar toda vez)
- ✅ Renovação automática do token
- ✅ Leads novos hoje
- ✅ Leads sem resposta
- ✅ Leads de Lipo / Harmonização Glútea
- ✅ Classificação quente/morno/frio por IA
- ✅ Identificação de gargalos de conversão
- ✅ Scripts de abordagem para WhatsApp

## Suporte

Em caso de dúvidas, verifique:
- O Redirect URI no Kommo está exatamente igual à URL do Vercel (com `/` no final)
- O Client ID e Client Secret estão corretos
- Você é administrador da conta Kommo
