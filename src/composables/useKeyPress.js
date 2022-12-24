import { onMounted, onBeforeUnmount } from "vue";

export function useKeyPress(keysHandlers) {
  let keysDown = new Set();

  const handler = (e) => {
    if (e.repeat) return;
    const key = e.code;
    keysDown.add(key);

    let deleteKeys = false;
    for (let item of keysHandlers) {
      if (setsAreEqual(item.keys, keysDown)) {
        e.preventDefault();
        item.handler();
      }
      if (keysDown.size > 2) {
        deleteKeys = true;
      }
    }

    if (deleteKeys) {
      keysDown = new Set();
    }
  };

  const keyupHandler = (e) => {
    const key = e.code;
    keysDown.delete(key);
  };

  function setsAreEqual(a, b) {
    if (a.size !== b.size) {
      return false;
    }

    return Array.from(a).every((element) => {
      return b.has(element);
    });
  }

  onMounted(() => {
    window.addEventListener("keydown", handler);
    window.addEventListener("keyup", keyupHandler);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("keydown", handler);
    window.addEventListener("keyup", keyupHandler);
  });
}
