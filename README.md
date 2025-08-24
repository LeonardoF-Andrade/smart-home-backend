# SMART-HOME Backend (NestJS)

API entre **frontend web** e a **maquete com ESP32**.  
Este serviço recebe comandos HTTP do site e encaminha para o ESP32, além de expor endpoints simples e consistentes para **portão, porta, janela, alarme, varal/secagem** e **iluminação**.

![Stack](https://img.shields.io/badge/Node-18%2B-339933) ![NestJS](https://img.shields.io/badge/NestJS-Framework-E0234E) ![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6) ![Axios](https://img.shields.io/badge/Axios-HTTP%20client-5A29E4)

---

## ✨ Recursos

- **Gateway HTTP** entre Frontend ↔ ESP32 (via Axios).
- **Arquitetura limpa**: controllers, use-cases e interfaces/DTOs.

---

## 🗂️ Estrutura (resumo)

```
src/
  dto/
    status-dto.interface.ts
  enum/
    lights.enum.interface.ts
  iluminação/
    iluminação.controller.ts
  interface/
    deviceControl.interface.ts
    turnOnAll.interface.ts
  ui/
    utils.controller.ts
  use-case/
    deviceControl.ts
    turnOnAll.ts
  app.module.ts
  main.ts
```

---

## 🔧 Requisitos

- **Node.js 18+**
- **npm** (ou pnpm/yarn)

---

## 🚀 Como rodar

```bash
# 1) Instalar dependências
npm install
# edite  com o IP do seu ESP32

# 3) Desenvolvimento (watch)
npm run start:dev

# 4) Produção
npm run build
npm run start:prod
```

## 📡 API

### Prefixos
- **Utilidades/atuadores**: `/utils`
- **Iluminação**: `/iluminacao` (sem acento)

### 1) Utilidades / Dispositivos binários
Controla dispositivos que alternam entre **ligado/desligado** ou **abrir/fechar**.  
**Controller:** `ui/utils.controller.ts`

> Todos recebem `PUT` com body `{ "status": true | false }`.

| Método | Rota                   | Dispositivo     | Body (JSON)          | Ação (`true`/`false`)                  |
|:-----:|------------------------|-----------------|----------------------|----------------------------------------|
| PUT   | `/utils/gate/status`     | Portão          | `{ "status": bool }` | Abre / Fecha                           |
| PUT   | `/utils/door/status`     | Porta           | `{ "status": bool }` | Abre / Fecha                           |
| PUT   | `/utils/window/status`   | Janela          | `{ "status": bool }` | Abre / Fecha                           |
| PUT   | `/utils/drying/status`   | Varal/Secagem   | `{ "status": bool }` | Inicia / Para                          |
| PUT   | `/utils/alarm/status`    | Alarme          | `{ "status": bool }` | Liga / Desliga                         |

**Exemplo (cURL):**
```bash
curl -X PUT http://localhost:3001/utils/gate/status   -H "Content-Type: application/json"   -d '{"status": true}'
```

#### Status geral (proxy do ESP)
Retorna o JSON enviado pelo ESP32 em `/status`.

| Método | Rota            | Descrição                       |
|:-----:|------------------|----------------------------------|
| GET   | `/utils/status`  | Estado consolidado do sistema   |

```bash
curl http://localhost:3001/utils/status
```

---

### 2) Iluminação
**Controller:** `iluminação/iluminação.controller.ts`

- **Acender/Apagar por cômodo**  
  `POST /iluminacao`  
  **Params:** `{ "id": "<nome-do-comodo>" }`  
  Encaminha para `${ESP_IP}/{room}` (ex.: `GET ${ESP_IP}/bedroom`).

```bash
curl -X POST http://localhost:3001/iluminacao   -H "Content-Type: application/json"   -d '{ "room": "bedroom" }'
```

- **Sinal SOS**  
  `POST /iluminacao/sos` (sem body)  
  Encaminha para `${ESP_IP}/sos`.


---

## 🧠 Arquitetura (alto nível)


**Como funciona:**
- Controllers recebem as requisições do frontend.
- Use-cases montam chamadas ao ESP32 com `axios` usando `ESP_IP` do `.env`.
- Requisições enviadas com `Connection: close` para evitar conexões persistentes que possam re-disparar ações no ESP.

---


## 🔒 CORS e Segurança

- Habilite CORS conforme o domínio do frontend.
- Considere `timeout` e **retries exponenciais** no Axios.
- Avalie um logger estruturado (ex.: `pino`) para produção.

---

## 📽️ Demonstração e Repositórios

- **Vídeo de demonstração**: disponível no meu post do LinkedIn - https://www.linkedin.com/in/leonardoandrade-dev.
- **Frontend**: `https://github.com/LeonardoF-Andrade/smart-home-frontend`
- **Backend**: este repositório.

---

## 👨‍💻 Autor

**Leonardo Andrade** — Engenharia Elétrica • Dev Full-Stack • IoT & Automação  
Aberto a conexões e oportunidades nas áreas de **Desenvolvimento de Software**. 🚀
