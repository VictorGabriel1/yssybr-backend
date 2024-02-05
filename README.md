# Monitor de Processos em Tempo Real com Socket.IO

Este projeto monitora e emite eventos em tempo real sobre os processos em execução no sistema operacional. Utilizando [Node.js](https://nodejs.org/), [Socket.IO](https://socket.io/), e a biblioteca [ps-list](https://www.npmjs.com/package/ps-list), fornece informações sobre a inicialização e encerramento de processos.

## Funcionalidades

- **Monitoramento em Tempo Real:** O servidor emite eventos para o frontend sempre que um novo processo é iniciado ou encerrado.
- **Socket.IO:** Comunicação eficiente entre servidor e frontend, permitindo uma troca de dados em tempo real.
- **ps-list:** Biblioteca para obter informações sobre os processos em execução no sistema operacional.

## Como Rodar o Projeto

1. **Instalação de Dependências:**
   Certifique-se de ter o Node.js instalado em seu ambiente. Execute o seguinte comando para instalar as dependências do projeto:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Execução do Servidor:**
   Inicie o servidor Socket.IO executando o seguinte comando:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   O servidor estará disponível na porta 8000.

3. **Configuração do Frontend:**
   Certifique-se de configurar o frontend para se conectar ao servidor Socket.IO na porta 8000, ou sinta-se a vontade para alterar a porta se desejar. Vale lembrar também que o CORS está ativo para receber informações da porta 3000, caso seu front-end esteja rodando em outra porta, certifique-se alterar também.

## Frontend

O frontend pode ser desenvolvido com frameworks como React, Angular ou Vue.js. Ele deve incluir a lógica para lidar com os eventos emitidos pelo servidor.

### Exemplo de Configuração do Frontend (React)

```tsx
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function App() {
  const [startedProcesses, setStartedProcesses] = useState([]);
  const [endedProcesses, setEndedProcesses] = useState([]);

  useEffect(() => {
    // Configurar os ouvintes para os eventos emitidos pelo servidor
    socket.on("processesStarted", (process) => {
      setStartedProcesses((prev) => [...prev, process]);
    });

    socket.on("processesEnded", (process) => {
      setEndedProcesses((prev) => [...prev, process]);
    });

    return () => {
      // Desconectar do servidor ao desmontar o componente
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Monitor de Processos em Tempo Real</h1>
      <h2>Processos Iniciados</h2>
      <ul>
        {startedProcesses.map((process, index) => (
          <li
            key={index}
          >{`${process.name} (PID: ${process.pid}) - ${process.date}`}</li>
        ))}
      </ul>

      <h2>Processos Encerrados</h2>
      <ul>
        {endedProcesses.map((process, index) => (
          <li
            key={index}
          >{`${process.name} (PID: ${process.pid}) - ${process.date}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## getProcesses

O arquivo `getProcesses.ts` contém a lógica para monitorar e emitir eventos sobre os processos em execução. Ele utiliza a biblioteca `ps-list` para obter informações sobre os processos.

### Detalhes do Funcionamento

- A cada segundo, a função `getProcesses` verifica a lista de processos atual em execução.
- Identifica processos que foram iniciados ou encerrados comparando com a lista anterior.
- Emite eventos para o frontend (`processesStarted` e `processesEnded`) contendo informações sobre os processos.

### Estrutura do Evento Emitido

- **processesStarted:** Evento emitido quando um novo processo é iniciado.

  - `name`: Nome do processo.
  - `pid`: ID do processo.
  - `date`: Data e hora do evento em formato legível.

- **processesEnded:** Evento emitido quando um processo é encerrado.
  - `name`: Nome do processo.
  - `pid`: ID do processo.
  - `date`: Data e hora do evento em formato legível.

## Socket.IO - Recebendo e Emetindo Eventos

O Socket.IO é utilizado para comunicação em tempo real entre o servidor e o frontend. No exemplo fornecido:

- **Recebendo Eventos no Frontend:**

  - Utiliza-se o hook `useEffect` para configurar ouvintes de eventos ao conectar o componente.
  - `socket.on` é usado para definir uma função de callback que será executada quando um evento específico for recebido do servidor.

- **Emitindo Eventos para o Servidor:**
  - Pode-se usar `socket.emit` para enviar eventos do frontend para o servidor.
  - No exemplo, não há um evento específico sendo emitido pelo frontend. A comunicação principal ocorre através dos eventos enviados pelo servidor para o frontend.

Lembre-se de ajustar conforme necessário para atender às suas necessidades específicas.

---

# Real-Time Process Monitor with Socket.IO

This project monitors and emits real-time events about running processes in the operating system. Utilizing [Node.js](https://nodejs.org/), [Socket.IO](https://socket.io/), and the [ps-list](https://www.npmjs.com/package/ps-list) library, it provides information about process startup and termination.

## Features

- **Real-Time Monitoring:** The server emits events to the frontend whenever a new process starts or ends.
- **Socket.IO:** Efficient communication between the server and frontend, enabling real-time data exchange.
- **ps-list:** Library to obtain information about running processes in the operating system.

## How to Run the Project

1. **Install Dependencies:**
   Ensure you have Node.js installed in your environment. Run the following command to install the project dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

2. **Run the Server:**
   Start the Socket.IO server by running the following command:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

   The server will be available on port 8000.

3. **Frontend Configuration:**
   Ensure you configure the frontend to connect to the Socket.IO server on port 8000. Feel free to change the port if needed. Also, keep in mind that CORS is active to receive information from port 3000. If your frontend is running on a different port, make sure to change it accordingly.

## Frontend

The frontend can be developed with frameworks like React, Angular, or Vue.js. It should include the logic to handle events emitted by the server.

### Example Frontend Configuration (React)

```tsx
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:8000");

function App() {
  const [startedProcesses, setStartedProcesses] = useState([]);
  const [endedProcesses, setEndedProcesses] = useState([]);

  useEffect(() => {
    // Set up listeners for events emitted by the server
    socket.on("processesStarted", (process) => {
      setStartedProcesses((prev) => [...prev, process]);
    });

    socket.on("processesEnded", (process) => {
      setEndedProcesses((prev) => [...prev, process]);
    });

    return () => {
      // Disconnect from the server when unmounting the component
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <h1>Real-Time Process Monitor</h1>
      <h2>Started Processes</h2>
      <ul>
        {startedProcesses.map((process, index) => (
          <li
            key={index}
          >{`${process.name} (PID: ${process.pid}) - ${process.date}`}</li>
        ))}
      </ul>

      <h2>Ended Processes</h2>
      <ul>
        {endedProcesses.map((process, index) => (
          <li
            key={index}
          >{`${process.name} (PID: ${process.pid}) - ${process.date}`}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

## getProcesses

The `getProcesses.ts` file contains the logic to monitor and emit events about running processes. It uses the `ps-list` library to obtain information about processes.

### Operation Details

- Every second, the `getProcesses` function checks the current list of running processes.
- It identifies processes that have started or ended by comparing with the previous list.
- It emits events to the frontend (`processesStarted` and `processesEnded`) containing information about the processes.

### Structure of the Emitted Event

- **processesStarted:** Emitted when a new process starts.

  - `name`: Process name.
  - `pid`: Process ID.
  - `date`: Date and time of the event in a readable format.

- **processesEnded:** Emitted when a process ends.

  - `name`: Process name.
  - `pid`: Process ID.
  - `date`: Date and time of the event in a readable format.

## Socket.IO - Receiving and Emitting Events

Socket.IO is used for real-time communication between the server and frontend. In the provided example:

- **Receiving Events on the Frontend:**

  - The `useEffect` hook is used to set up event listeners when the component connects.
  - `socket.on` is used to define a callback function that will be executed when a specific event is received from the server.

- **Emitting Events to the Server:**
  - You can use `socket.emit` to send events from the frontend to the server.
  - In the example, there is no specific event being emitted by the frontend. The main communication occurs through events sent by the server to the frontend.

Adjust as needed to meet your specific requirements.

---
