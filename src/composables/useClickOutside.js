import { onMounted, onBeforeUnmount } from "vue";

/**
 *
 * @param {*} elTargetRef The Root element for which clicking outside will trigger callback_fn
 * @param {*} onClickOutside The function to call when user clicks outside of
 * @param {Function} callbackCondition Function, if provided, returns boolean indication if click outside should be allowed to happen
 * @returns
 */

export async function useClickOutside(
  elTargetRef,
  onClickOutside,
  callbackCondition,
  options = {
    handleEscape: false,
  }
) {
  if (!elTargetRef) return;

  let action;

  let listener = async (e) => {
    action = null;
    let enableClickOutside = true;
    if (typeof callbackCondition == "function") {
      enableClickOutside = callbackCondition();
    }
    if (!enableClickOutside) return;
    if (
      e.target == elTargetRef.value ||
      e.composedPath().includes(elTargetRef.value)
    ) {
      //We clicked inside the modal/active region
      return;
    }

    //at this point we clicked outside the modal
    if (enableClickOutside && typeof onClickOutside == "function") {
      action = onClickOutside;
    }
  };

  let handleAction = () => {
    if (typeof action === "function") action();
  };

  const handleEscape = (e) => {
    let enableEscapeKey = false;
    if (e.key === "Escape" || e.code === "Escape") {
      enableEscapeKey = callbackCondition();
    }
    if (!enableEscapeKey) return;
    if (enableEscapeKey && typeof onClickOutside == "function") {
      action = onClickOutside;
    }

    handleAction();
  };

  onMounted(() => {
    window.addEventListener("mousedown", listener);
    window.addEventListener("mouseup", handleAction);
    if (options.handleEscape) window.addEventListener("keyup", handleEscape);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("mousedown", listener);
    window.removeEventListener("mouseup", handleAction);
    window.removeEventListener("keyup", handleEscape);
  });
  return {
    listener,
  };
}
