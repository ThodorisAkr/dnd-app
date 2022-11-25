import { ref } from "vue";

export default function useHttp() {
  const pending = ref(false);
  const error = ref(null);

  const fetch = async (requestMethod, ...args) => {
    pending.value = true;
    try {
      const res = await requestMethod(...args);
      pending.value = false;
      return res;
    } catch (err) {
      pending.value = false;
      error.value = err;
      return;
    }
  };

  return { pending, error, fetch };
}
