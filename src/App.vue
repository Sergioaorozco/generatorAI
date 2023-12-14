<script setup>
  import { GoogleGenerativeAI } from '@google/generative-ai';
  import { useQuery } from "@tanstack/vue-query";

  const { isPending, isLoading,  isError, data } = useQuery({
  queryKey: ['response'],
  queryFn: getGenData,
  enabled: false
})
  import {ref} from 'vue'

  let loaderSkeleton = ref(false)
  let output = ref('')
  let inputText = ref('')

  
  async function getGenData() {
    loaderSkeleton.value = true;
    const genAi = new GoogleGenerativeAI(import.meta.env.VITE_VERCEL_GOOGLE_AI_KEY) 
    const model = genAi.getGenerativeModel({model: 'gemini-pro'});
    const result = await model.generateContent(inputText.value);
    try {
      const response = result.response;
      const text = response.candidates[0].content.parts[0].text
      output.value = text
    } catch(error) {
      console.error(error)
    } finally {
      loaderSkeleton.value = false
    }
  }


</script>
<template>

  <div v-if="isFetching" class="wrapper">
    <div class="flex w-full mt-20">
      <Skeleton size="4rem" class="mr-2"></Skeleton>
      <div class="w-full">
        <Skeleton width="10rem" class="mb-2"></Skeleton>
        <Skeleton class="mb-2"></Skeleton>
        <Skeleton class="mb-2"></Skeleton>
      </div>
    </div>
    <Skeleton height="10em" class=" mt-3 mb-2 w-full"></Skeleton>
  </div>
  <div class="wrapper" v-else-if="isError">
    <section class=" mt-10 px-4 py-3 bg-red-100 border border-red-200 rounded-lg">
      <p>You Got an Error Requesting the data</p>
    </section>
  </div>
  <main v-else class="flex flex-col gap-y-2 wrapper">
    <h1 class="text-3xl font-semibold text-slate-800 mt-20">Google AI Generator</h1>
    <input type="text" v-model="inputText" class="w-full border-2 border-slate-100 py-3 px-2 rounded-lg">
    <button v-if="inputText" @click="getGenData" class="bg-blue-500 hover:bg-blue-800 text-xl transition-colors font-semibold duration-300 text-white rounded-md py-4">Generate Content</button>
    <button v-else class="bg-gray-500/30 transition-all text-xl font-semibold border-slate-900 pointer-none duration-300 text-slate-700 rounded-md py-4">Send a Prompt</button>
    <section v-if="output" class=" mt-10 px-4 py-3 bg-slate-100 border border-slate-200 rounded-lg">
      <h2 class="text-xl font-semibold">Response</h2>
      <hr class="mb-4">
      <p>{{ output }}</p>
    </section>
  </main>
</template>
