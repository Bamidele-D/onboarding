<template>
    <div class="w-full">
        <div>
            <span class="cursor-pointer" @click="decreaseIndex()">
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20.3389L4 12.3389M4 12.3389L12 4.33887M4 12.3389H18.5" stroke="#111111" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
                </svg>
            </span>
            <h1 class="text-3xl font-bold mt-4">Business Registration</h1>
            <p class="text-[#494D4F] text-sm">We want to know more about you.</p>
        </div>

        <div class="mt-10">
            <form>
                <div class="flex gap-5 mb-5">
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">First Name</label>
                        <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Enter First Name" v-model="personalData.first_name" readonly disabled>
                    </div>
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">Last Name</label>
                        <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Enter Last Name" v-model="personalData.last_name" readonly disabled>
                    </div>
                </div>
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Phone Number</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Phone Number" v-model="personalData.phone" readonly disabled>
                </div>

                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">BVN</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="BVN" v-model="personalData.bvn" readonly disabled>
                </div>
                
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Email Address</label>
                    <input type="email" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Email Address" v-model="personalData.email" readonly disabled>
                </div>

                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Business Name</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Business Name" v-model="businessData.organisation_name" @blur="checkBusinessData('organisation_name')">
                    <div class="text-red-500 text-xs mt-1" v-if="validateBusinessDetails.errors.organisation_name && filledBusinessData.organisation_name">{{ validateBusinessDetails.errors.organisation_name }}</div>
                </div>

                <div class="flex gap-5 mb-5">
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">Date of Incorporation</label>
                        <input type="date" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="" v-model="businessData.date_of_incorporation" @blur="checkBusinessData('date_of_incorporation')">
                        <div class="text-red-500 text-xs mt-1" v-if="validateBusinessDetails.errors.date_of_incorporation && filledBusinessData.date_of_incorporation">{{ validateBusinessDetails.errors.date_of_incorporation }}</div>
                    </div>
                    <div class="flex flex-col w-1/2">
                        <label for="" class="text-sm text-[#62676A]">Business Category</label>
                        <select class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" v-model="businessData.type_of_business" @blur="checkBusinessData('type_of_business')">
                            <option>Business Category</option>
                            <option value="tech">Tech</option>
                        </select>
                        <div class="text-red-500 text-xs mt-1" v-if="validateBusinessDetails.errors.type_of_business && filledBusinessData.type_of_business">{{ validateBusinessDetails.errors.type_of_business }}</div>
                    </div>
                </div>
                
                <div class="flex flex-col mb-5">
                    <label for="" class="text-sm text-[#62676A]">Business Address</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Business Address" v-model="businessData.address" @blur="checkBusinessData('address')">
                    <div class="text-red-500 text-xs mt-1" v-if="validateBusinessDetails.errors.address && filledBusinessData.address">{{ validateBusinessDetails.errors.address }}</div>
                </div>

                <div class="flex flex-col w-1/2">
                    <label for="" class="text-sm text-[#62676A]">Country</label>
                    <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md text-sm" placeholder="Enter Country" v-model="businessData.country" @blur="checkBusinessData('country')">
                    <div class="text-red-500 text-xs mt-1" v-if="validateBusinessDetails.errors.country && filledBusinessData.country">{{ validateBusinessDetails.errors.country }}</div>
                </div>

                <p class="text-sm text-[#62676A] text-center mt-5 mb-2">By clicking the “Create My Account” button, you agree to Kredi’s <a href="" class="font-bold underline">terms of acceptable use.</a></p>

                <div>
                    <button class="h-[60px] w-full text-white font-semibold rounded-lg" :class="{'bg-[#1C2C3580] cursor-not-allowed' : !validateBusinessDetails.isValid, 'bg-[#1C2C35]': validateBusinessDetails.isValid}" :disabled="!validateBusinessDetails.isValid" @click.prevent="createBusinessAccount()">{{loading ? 'Please wait...' : 'Continue →'}}</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { createBusiness } from "../services";
const props = defineProps([
    'businessData', 'personalData', 'increaseIndex', 'decreaseIndex'
]);

const filledBusinessData = ref({
    organisation_name: false,
    type_of_business: false,
    date_of_incorporation: false,
    country: false,
    address: false,
});
const loading = ref(false);

// const validateInput = computed(() => {
//     const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
//     const validEmail = emailPattern.test(form.value.email)
//     const validPhone = form.value.phone.length === 11
//     if (!validEmail) {
//         return true;
//     }
//     if (!validPhone) {
//         return true;
//     }
// })


const validateBusinessDetails = computed(() => {
    const { organisation_name, type_of_business, date_of_incorporation, country, address } = props.businessData;
    const errors = {};

    if (!organisation_name) {
        errors.organisation_name = 'Organisation Name is required';
    }
    if (!type_of_business) {
        errors.type_of_business = 'Type of Business is required';
    }
    if (!date_of_incorporation) {
        errors.date_of_incorporation = 'Date of Incorporation is required';
    }
    if (!country) {
        errors.country = 'Country Address is required';
    }
    if (!address) {
        errors.address = 'Address is required';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
});

const checkBusinessData = (businessData) => {
    filledBusinessData.value[businessData] = true;
}

const createBusinessAccount = async () => {
    try {
        loading.value = true;
        const payload = {
            ...props.personalData, ...props.businessData
        }
        const response = await createBusiness(payload);
        console.log(response);
        loading.value = false;
        if(response.status == 200) {
            props.increaseIndex();
        }
    } catch(err) {
        loading.value = false;
        console.log(err)
    }
}
</script>