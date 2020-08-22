import { watchEffect } from 'vue'

export default function (props: any, { emit }: { emit: Function }) {

  function change (index: number) {
    emit('update:modelValue', index)
  }

  function getOptionClass (i: number) {
    return { active: props.modelValue === i }
  }

  return {
    change,
    getOptionClass,
  }
}
