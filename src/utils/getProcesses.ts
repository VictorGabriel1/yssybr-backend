import psList, { ProcessDescriptor } from "ps-list";
import { Socket } from "socket.io";

export const getProcesses = (socket: Socket) => {
  let currentProcesses: any = [];

  setInterval(async () => {
    try {
      const newProcesses = await psList();

      const startedProcesses = newProcesses.filter(
        (p) =>
          !currentProcesses.some((cp: { name: string }) => cp.name === p.name)
      );

      startedProcesses.forEach((process) => {
        const { pid, name } = process;
        socket.emit("processesStarted", {
          name,
          pid,
          date: new Date().toLocaleString("pt-BR"),
        });
      });

      const endedProcesses = currentProcesses.filter(
        (cp: { name: string; pid: number }) =>
          !newProcesses.some((p) => p.name === cp.name)
      );

      endedProcesses.forEach((process: { name: any; pid: any }) => {
        const { pid, name } = process;
        socket.emit("processesEnded", {
          name,
          pid,
          date: new Date().toLocaleString("pt-BR"),
        });
      });

      // Atualiza a lista de processos atuais
      currentProcesses = newProcesses;
    } catch (error) {
      console.error("Erro ao obter a lista de processos:", error);
    }
  }, 1000);
};
