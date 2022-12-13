import { onMounted, ref } from "vue";

export const useDebounce = (fn) => {
  let debouncedSearch = ref(null);
  const handleTimeout = (fn) => {
    let timeout;
    function inner(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        fn(...args);
      }, 500);
    }

    return inner;
  };

  onMounted(() => {
    debouncedSearch.value = handleTimeout(fn);
  });

  return { debouncedSearch };
};
