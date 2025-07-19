<script>
import { isNumNotNull, isStrNotNull } from '@/utils/utils'
import Selector from './Components/Selector.vue'
import LifeCycleMixin from '@/components/Common/LifeCycleMixin.vue'
import DeleteBtn from '@/packages/DeleteBtn.vue'
const validator = value => {
  console.log('validator', value)
  return (
    isStrNotNull(value.title) &&
    isNumNotNull(value.voteTimeLimit) &&
    isNumNotNull(value.voteType) &&
    Array.isArray(value.options) &&
    value.options.length > 0 &&
    value.options.every(item => item.value)
  )
}
export default {
  props: {
    //{title: '',options: [{ value: 1 }],voteTimeLimit: 7,voteType: 1,},
    votes: {
      type: Object,
      validator,
    },
  },
  mixins: [LifeCycleMixin],
  emits: ['update'],
  components: { Selector, DeleteBtn },
  data() {
    return {
      title: { value: '', maxlength: 30 },
      options: [{ value: '' }, { value: '' }],
      selectVoteType: 1,
      selectVoteTime: 7,
      optionMaxlength: 25,
      voteTypes: { 1: { text: '单选', value: 1 }, 2: { text: '多选', value: 2 } },
      voteTimes: {
        1: { value: 7, id: 1, text: '一周' },
        2: { value: 30, id: 2, text: '一个月' },
        3: { value: 90, id: 3, text: '三个月' },
        4: { value: 180, id: 4, text: '半年' },
      },
    }
  },
  created() {
    if (this.votes) {
      ;({ title: this.title.value, voteTimeLimit: this.selectVoteTime, voteType: this.selectVoteType } = this.votes)
      this.options = this.votes.options.map(item => ({ value: item.value }))
    }
  },
  computed: {
    isVoteCreated() {
      return this.votes
    },
  },
  methods: {
    handleAddOption() {
      this.options.push({ value: '' })
    },
    handleDeleteOption(index) {
      this.options.splice(index, 1)
    },
    resetVote() {
      this.title.value = ''
      this.options = [{ value: '' }, { value: '' }]
      this.selectVoteType = 1
      this.selectVoteTime = 7
    },
    modifyVote() {
      const votes = this.getVotesData()
      console.log(votes)

      if (!validator(votes)) {
        this.$message('请完整填写投票内容')
        return
      }
      this.$emit('update', votes)
    },
    getVotesData() {
      return {
        title: this.title.value,
        options: this.options.map(item => ({
          value: item.value,
        })),
        voteTimeLimit: this.selectVoteTime,
        voteType: this.selectVoteType,
      }
    },
  },
}
</script>
<template>
  <div class="box-border w-full p-2">
    <!-- 标题 -->
    <div class="border-b-1 relative flex h-10 items-center border-[#ddd]">
      <input class="w-full" v-model="title.value" type="text" placeholder="投票标题" :maxlength="title.maxlength" />
      <span class="absolute right-0 text-xs text-[#aaa]">{{ title.value.length + '/' + title.maxlength }}</span>
    </div>

    <main class="pb-15">
      <div class="options">
        <div
          class="relative mt-4 box-border flex h-12 items-center rounded-[0.5rem] bg-[#eeec] px-4 py-2"
          v-for="(option, index) in options"
          :key="index">
          <input
            class="w-full"
            v-model="option.value"
            type="text"
            :placeholder="'选项 ' + (index + 1)"
            :maxlength="title.maxlength" />
          <span class="absolute right-2 text-xs text-[#aaa]">{{ option.value.length + '/' + optionMaxlength }}</span>
          <DeleteBtn class="-right-1 -top-1" @delete="handleDeleteOption(index)" />
        </div>
        <div @click="handleAddOption" class="center my-4 box-border h-10 rounded-[0.5rem] bg-[#eee9] text-[#0fb48b]">
          <span class="mb-0.5 pr-1 text-[1.5rem]">+</span>
          添加选项
        </div>
      </div>
      <!-- 投票设置 -->
      <div>
        <aside class="font-semibold">投票类型</aside>
        <Selector :options="voteTypes" :value="selectVoteType" @select="val => (selectVoteType = val)" />
      </div>
      <div>
        <aside class="font-semibold">结束时间</aside>
        <Selector :options="voteTimes" :value="selectVoteTime" @select="val => (selectVoteTime = val)" />
      </div>
    </main>

    <footer class="h-15 fixed bottom-0 left-0 box-border flex w-full items-center bg-white px-4">
      <button @click="resetVote" class="center flex-3 h-10 rounded-full bg-[#eee] text-[#0fb48b]">重置</button>
      <button @click="modifyVote" class="linear-bg center flex-4 ml-2 h-10 rounded-full text-white">
        {{ isVoteCreated ? '修改投票' : '创建投票' }}
      </button>
    </footer>
  </div>
</template>
<style></style>
