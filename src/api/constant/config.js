export let API_URL = "http://localhost:8000/api";

if (import.meta.env.MODE === "development") {
  API_URL = import.meta.env.VITE_PUBLIC_API_URL_DEV;
} else {
  API_URL = import.meta.env.VITE_PUBLIC_API_URL_PROD;
}

console.log(import.meta.env.MODE);