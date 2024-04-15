<template>
  <div class="flex">
    <SidebarView />
    <div class="p-36 w-[calc(100%_-_18rem)]">
      <div class="mb-[40px]">
        <div class="w-full h-[4px] bg-[#F4F9FD] mb-[5px]">
          <div class="bg-[#00DE59] h-full w-full" :style="{ width: progressWidth }"></div>
        </div>
        <span>{{ progressIndex }}/{{ totalProgressIndex }}</span>
      </div>
      <GetStarted :accountType="accountType" :selectAccountType="selectAccountType" :increaseIndex="increaseIndex"  v-if="progressIndex == 0" />

      <CustomerDetails :personalData="personalData" :increaseIndex="increaseIndex" v-if="progressIndex == 1" />

      <OTPView :personalData="personalData" :increaseIndex="increaseIndex" v-if="progressIndex == 2" />

      <BVNVerification  :personalData="personalData" :increaseIndex="increaseIndex" :accountType="accountType" :progressIndex="progressIndex" :totalProgressIndex="totalProgressIndex" v-if="progressIndex == 3" />

      <BusinessRegistration v-if="progressIndex == 4" />

      <RegistrationCompleted v-if="progressIndex == 5" />
    </div>
    <ContentArea />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SidebarView from "../components/SidebarView.vue";
import ContentArea from "../components/ContentArea.vue";
import GetStarted from "../components/GetStarted.vue";
import CustomerDetails from "../components/CustomerDetails.vue";
import OTPView from "../components/OTPView.vue";
import BVNVerification from "../components/BVNVerification.vue";
import BusinessRegistration from "../components/BusinessRegistration.vue";
import RegistrationCompleted from "../components/RegistrationCompleted.vue";

const accountType = ref("personal");
const progressIndex = ref(0);
const totalProgressIndex = ref(5);
const progressBarWidth = ref(0);
const personalData = ref({
  first_name: "afeez",
  last_name: "dosunmu",
  phone: "08160897065",
  email_address: "dosunmuafeez37@gmail.com",
  password: "password",
  bvn: "00000111111"
});

const progressWidth = computed(() => {
  return `${progressBarWidth.value}%`
})

const selectAccountType = (user) => {
  accountType.value = user;
}

const increaseIndex = () => {
  progressIndex.value += 1;
  progressBarWidth.value += 20;
}
</script>