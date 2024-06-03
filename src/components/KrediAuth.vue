<template>
  <div class="flex">
    <SidebarView :progressIndex="progressIndex" :accountType="accountType" />
    <div class="px-[20px] lg:px-36 py-20 w-full lg:w-[calc(100%_-_18rem)] h-screen overflow-y-scroll">
      <div class="mb-[40px]">
        <div class="w-full h-[4px] bg-[#F4F9FD] mb-[5px]">
          <div class="bg-[#00DE59] h-full w-full" :style="{ width: progressWidth }"></div>
        </div>
        <span>{{ progressIndex }}/{{ totalProgressIndex }}</span>
      </div>
      <GetStarted :accountType="accountType" :selectAccountType="selectAccountType" :increaseIndex="increaseIndex"  v-if="progressIndex == 0" :decreaseIndex="decreaseIndex" />
      
      <CustomerDetails :accountType="accountType" :personalData="personalData" :increaseIndex="increaseIndex" v-if="progressIndex == 1" :decreaseIndex="decreaseIndex" :redirectLink="redirectLink" :token="token" :apikey="apikey" />
      
      <OTPView :personalData="personalData" :increaseIndex="increaseIndex" v-if="progressIndex == 2" :decreaseIndex="decreaseIndex" :token="token" :apikey="apikey" />
      
      <BVNVerification  :personalData="personalData" :increaseIndex="increaseIndex" :accountType="accountType" :progressIndex="progressIndex" :totalProgressIndex="totalProgressIndex" v-if="progressIndex == 3" :decreaseIndex="decreaseIndex" :token="token" :apikey="apikey" :bvntoken="bvntoken" />

      <BusinessRegistration :personalData="personalData" :businessData="businessData" :increaseIndex="increaseIndex" :decreaseIndex="decreaseIndex" 
      v-if="showBusinessRegistration" :token="token" :apikey="apikey" />
      
      <RegistrationCompleted :resetData="resetData" :redirectLink="redirectLink" v-if="showRegistrationCompleted" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import SidebarView from "../components/SidebarView.vue";
import GetStarted from "../components/GetStarted.vue";
import CustomerDetails from "../components/CustomerDetails.vue";
import OTPView from "../components/OTPView.vue";
import BVNVerification from "../components/BVNVerification.vue";
import BusinessRegistration from "../components/BusinessRegistration.vue";
import RegistrationCompleted from "../components/RegistrationCompleted.vue";
const props = defineProps({
  redirectLink: {
    type: String,
    required: true,
  },
  apikey: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  bvntoken: {
    type: String,
    required: true,
  },
});


const accountType = ref("");
const  progressIndex = ref(0);
const progressBarWidth = ref(0);
const personalData = ref({
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  password: "",
  bvn: ""
});

const businessData = ref({
  organisation_name: "",
  type_of_business: "",
  date_of_incorporation: "",
  country: "",
  address: "",
})

const progressWidth = computed(() => {
  return `${progressBarWidth.value}%`
})

const totalProgressIndex = computed(() => {
  if (accountType.value == 'personal') {
    return 4;
  }
  if (accountType.value == 'business') {
    return 5;
  }
  else {
    return 0;
  }
})

const selectAccountType = (user) => {
  accountType.value = user;
  progressIndex.value = 0;
}

const increaseIndex = () => {
  progressIndex.value += 1;
  if (accountType.value == 'personal') {
    progressBarWidth.value += 25;
  }
  if (accountType.value == 'business') {
    progressBarWidth.value += 20;
  }
}

const decreaseIndex = () => {
  progressIndex.value -= 1;
  if (accountType.value == 'personal') {
    progressBarWidth.value -= 25;
  }
  if (accountType.value == 'business') {
    progressBarWidth.value -= 20;
  }
}

const dynamicProgressIndex = computed(() => {
  return accountType.value === 'personal' ? 4 : progressIndex.value;
});

const showBusinessRegistration = computed(() => {
  return accountType.value !== 'personal' && dynamicProgressIndex.value === 4;
});

const showRegistrationCompleted = computed(() => {
  return (accountType.value === 'personal' && progressIndex.value === 4) || progressIndex.value === 5;
});

const resetData = () => {
  personalData.value.first_name = '';
  personalData.value.last_name = "";
  personalData.value.phone = "";
  personalData.value.email = "";
  personalData.value.password = "";
  personalData.value.bvn = "";
  
  businessData.value.organisation_name = '';
  businessData.value.type_of_business = '';
  businessData.value.date_of_incorporation = '';
  businessData.value.country = '';
  businessData.value.address = '';
  businessData.value.phone_no = personalData.value.phone;
  
  accountType.value = "";
  progressIndex.value = 0;
  progressBarWidth.value = 0;
}
</script>