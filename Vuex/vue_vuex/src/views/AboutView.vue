<template>
  <div class="about">我是about的数字:{{ getNum }}</div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AboutView',
  computed: {
    ...mapGetters(['getNum'])
  }
}
</script>
