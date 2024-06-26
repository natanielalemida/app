import axios from 'axios';

// Crie uma instância do Axios com a URL base
const axiosInstance = axios.create({
  baseURL: 'http://192.168.0.164:3000/',
});

// Função para abrir a URL específica e enviar o body, se necessário
export function openUrl(body: {
  endpoint?: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
}) {
  return axiosInstance({
    method: body.method,
    url: body.endpoint,
    data: body.data,
  });
}
