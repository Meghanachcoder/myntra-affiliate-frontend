import { logHelper } from "./utils";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const TAG = "Socket:";

let wsConnection: WebSocket | null = null;

const connectWebSocket = (mobileNumber: string, affiliateId: string) => {

  try {
    if (wsConnection) {
      wsConnection.close();
      wsConnection = null;
      logHelper(TAG, " ===> Existing WebSocket connection closed");
    }
  } catch (error) {
    return { status: false, message: "Failed to close existing WebSocket connection" };
  }

  const wsUrl: string = `ws://localhost:5001?affiliateId=${encodeURIComponent(affiliateId)}&mobile=${encodeURIComponent(mobileNumber)}`;

  logHelper(TAG, " ===> Connecting to WebSocket", wsUrl);

  try {
    wsConnection = new WebSocket(wsUrl);
    logHelper(TAG, " ===> WebSocket Connection Created");
  } catch (error) {
    logHelper(TAG, " ===> WebSocket Connection Error", error);
    return { status: false, message: "Failed to create new WebSocket connection" };
  }

  try {
    wsConnection.onopen = () => {
      logHelper(TAG, " ===> WebSocket Connected");;
    }
  } catch (error) {
    logHelper(TAG, " ===> WebSocket Connection Error", error);
    return { status: false, message: "SMW while setting onopen event" };
  }

  wsConnection.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      logHelper(TAG, " ===> WebSocket Message Received", data);

      handleWebSocketMessage(data);
    } catch (error) {
      logHelper(TAG, " ===> WebSocket Message Parse Error", error);
    }
  };

  wsConnection.onerror = (error) => {
    logHelper(TAG, " ===> WebSocket Error", error);
  };

  wsConnection.onclose = (event) => {
    logHelper(TAG, " ===> WebSocket Closed", { code: event.code, reason: event.reason });
    wsConnection = null;
  };

  return { status: true, message: "WebSocket connection established" };

};

const disconnectWebSocket = () => {
  if (wsConnection) {
    wsConnection.close();
    wsConnection = null;
  }
};

const getWebSocketStatus = () => {
  if (!wsConnection) return 'disconnected';
  switch (wsConnection.readyState) {
    case WebSocket.CONNECTING:
      return 'connecting';
    case WebSocket.OPEN:
      return 'connected';
    case WebSocket.CLOSING:
      return 'closing';
    case WebSocket.CLOSED:
      return 'closed';
    default:
      return 'unknown';
  }
};

const sendWebSocketMessage = (message: any) => {
  if (wsConnection && wsConnection.readyState === WebSocket.OPEN) {
    wsConnection.send(JSON.stringify(message));
    return true;
  }
  logHelper(TAG, " ===> Cannot send message - WebSocket not connected");
  return false;
};

const handleWebSocketMessage = (data: any) => {
  switch (data.type) {

    default:
      logHelper(TAG, " ===> Unknown WebSocket Message Type", data);
  }
};

export const useWebSocket = () => {

  useEffect(() => {
    return () => {
      disconnectWebSocket();
    };
  }, []);

  return {
    connect: connectWebSocket,
    disconnect: disconnectWebSocket,
    getStatus: getWebSocketStatus,
    sendMessage: sendWebSocketMessage,
  };
};

export {
  connectWebSocket,
  disconnectWebSocket,
  getWebSocketStatus,
  sendWebSocketMessage,
  handleWebSocketMessage
};
