import { onMounted, onBeforeUnmount } from "vue";

/**
 *
 * @param {*} el_target_ref The Root element for which clicking outside will trigger callback_fn
 * @param {*} on_click_outside The function to call when user clicks outside of
 * @param {Function} callback_condition Function, if provided, returns boolean indication if click outside should be allowed to happen
 * @returns
 */
export async function useClickOutside(
  el_target_ref,
  on_click_outside,
  callback_condition
) {
  if (!el_target_ref) return;

  let action;

  let listener = async (e) => {
    action = null;
    let enable_click_outside = true;
    if (typeof callback_condition == "function") {
      enable_click_outside = callback_condition();
    }
    if (!enable_click_outside) return;
    if (
      e.target == el_target_ref.value ||
      e.composedPath().includes(el_target_ref.value)
    ) {
      //We clicked inside the modal/active region
      return;
    }

    //at this point we clicked outside the modal
    if (enable_click_outside && typeof on_click_outside == "function") {
      action = on_click_outside;
    }
  };

  let handleAction = () => {
    if (typeof action === "function") action();
  };

  onMounted(() => {
    window.addEventListener("mousedown", listener);
    window.addEventListener("mouseup", handleAction);
  });
  onBeforeUnmount(() => {
    window.removeEventListener("mousedown", listener);
    window.addEventListener("mouseup", handleAction);
  });
  return {
    listener,
  };
}
