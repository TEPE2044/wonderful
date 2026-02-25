import { createClient } from "graphql-ws";


// 启动 graph-ws
export const wsClient = createClient({
  url: "ws://localhost:12404/api/v1/gql/subql",
  shouldRetry: () => true,
  connectionParams: () => getAuthHeaders(),
});

// 获取
const getAuthHeaders = () => {
  const rcode = localStorage.getItem("rcode")
  const payload = localStorage.getItem("payload");
  
  if(!rcode && !payload)
  {
    console.error("UNAUTHORIZATION")
    return
  }
  return {
    Authorization: rcode ? `Bearer ${rcode}` : "",
    "X-Payload": payload || '',
  };
};