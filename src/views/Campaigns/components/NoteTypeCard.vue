<script>
import { computed, useAttrs } from "vue";
import { useRoute } from "vue-router";
import BaseCard from "@/components/BaseCard.vue";

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    BaseCard,
  },

  setup(props) {
    const attrs = useAttrs();
    const route = useRoute();

    const isActive = computed(
      () => route.params.type === props.item.label.toLowerCase()
    );
    const computedClasses = computed(() => {
      if (isActive.value) {
        return `active__border-${attrs.position}`;
      }
      return "";
    });

    const getImgUrl = (img) => {
      let url = new URL(`/src/assets/notes/${img}.svg`, import.meta.url);
      return url;
    };

    return {
      computedClasses,
      isActive,
      getImgUrl,
    };
  },
};
</script>

<template>
  <base-card
    class="p-1 h-[100px] w-[80px] md:h-[125px] md:w-[100px] lg:h-[150px] lg:w-[130px] items-center justify-around cursor-pointer hover:scale-[1.02] active:scale-[1.03]"
    :class="computedClasses"
    @click="$emit('click')"
  >
    <div>
      <img
        :src="getImgUrl(item.img)"
        style="object-fit: contain; max-height: 80px"
      />
    </div>
    {{ item.label }}
    <div></div>
  </base-card>
</template>

<style lang="scss" scoped>
.active__border-l {
  border-bottom: 3px solid red;
}

.active__border-r {
  border-bottom: 3px solid red;
}

@media screen and (min-width: 1024px) {
  .active__border-l {
    border-bottom: 0;
    border-left: 4px solid red;
  }

  .active__border-r {
    border-bottom: 0;
    border-right: 4px solid red;
  }
}
</style>
