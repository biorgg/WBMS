<template lang="pug">
  div
    input(type='text' style='display:none')
    Input(name="password" :type="inputType" :readonly="readonly" @on-focus="readonlyHandler" @on-change="inputHandler" clearable :value="password" :placeholder="placeholder" autocomplete='new-password')
      Icon(v-if="icon" :type="icon" slot="prepend")
</template>

<script>
export default {
  name: 'InputPassWord',
  model: [
    {
      prop: 'password',
      event: 'change'
    }
  ],
  props: {
    password: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      inputText: '',
      readonly: true,
      inputType: 'text'
    }
  },
  methods: {
    inputHandler: function (e) {
      this.inputText = e.target.value
      this.$emit('input', e.target.value)
      this.inputType = 'password'
      if (e.target.value === '') {
        this.inputType = 'text'
        this.readonlyHandler()
      }
    },
    readonlyHandler: function () {
      this.readonly = true
      let timer = setTimeout(() => {
        clearTimeout(timer)
        this.readonly = false
      }, 0)
    }
  }
}
</script>
