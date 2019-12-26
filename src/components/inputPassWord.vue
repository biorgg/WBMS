<template>
  <div>
    <Input name="password"
           :type="inputType"
           :readonly="readonly"
           @on-focus="inputTypeHandler"
           @on-change="inputHandler"
           clearable
           :value="password"
           :placeholder="placeholder">
    <Icon v-if="icon"
          :type="icon"
          slot="prepend"></Icon>
    </Input>
  </div>
</template>

<script>
export default {
  name: 'InputPassWord',
  model: [
    {
      prop: 'password',
      event: 'input'
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
      readonly: false
    }
  },
  computed: {
    inputType () {
      if (this.inputTypeHandler()) {
        return 'text'
      } else {
        return 'password'
      }
    }
  },
  methods: {
    inputHandler: function (e) {
      this.inputText = e.target.value
      this.$emit('input', e.target.value)
    },
    inputTypeHandler: function () {
      if (this.inputText) {
        return false
      } else {
        this.readonly = true
        let timer = setTimeout(() => {
          clearTimeout(timer)
          this.readonly = false
        }, 0)
        return true
      }
    }
  }
}
</script>
