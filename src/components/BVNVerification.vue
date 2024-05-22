<template>
    <div>
        <span class="cursor-pointer" @click="decreaseIndex()">
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 20.3389L4 12.3389M4 12.3389L12 4.33887M4 12.3389H18.5" stroke="#111111" stroke-width="2" stroke-miterlimit="10" stroke-linecap="square"/>
            </svg>
        </span>
        <div v-if="isBvnVerified">
            <div class="w-full" v-if="isBVN">
                <div>
                    <h1 class="text-3xl font-bold mt-4">BVN Validation</h1>
                    <p class="text-[#494D4F] text-sm">Validate your BVN </p>
                </div>
                
                <div class="mt-10">
                    <form>
                        <div class="flex flex-col mb-5">
                            <label for="" class="text-sm text-[#62676A]">BVN Number</label>
                            <input type="text" class="border border-[#B7BBBE] h-[50px] px-2.5 rounded-md"
                            placeholder="Bank Verification Number" v-model="personalData.bvn">
                        </div>
                        
                        <div>
                            <button class="bg-[#1C2C35] h-[60px] w-full text-white font-semibold rounded-lg"
                            @click.prevent="sendUserBvnOtp()">{{ loading ? 'Please wait...' : 'Verify BVN'
                        }}</button>
                    </div>
                </form>
            </div>
        </div>
        
        <div class="w-full" v-else>
            <div>
                <h1 class="text-3xl font-bold">Enter the code</h1>
                <p class="text-[#494D4F] text-sm">Enter the OTP code sent to your phone, be careful not to share the
                    code
                    with anyone.</p>
                </div>
                
                <div class="mt-20">
                    <form action="">
                        <div class="flex justify-center gap-5 mb-5">
                            <div class="my-4 flex justify-center">
                                <v-otp-input ref="otpInput" input-classes="otp-input" separator="&nbsp;&nbsp;"
                                :num-inputs="6" :should-auto-focus="true" :is-input-num="true"
                                :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']"
                                :placeholder="['0', '0', '0', '0', '0', '0']" @on-change="handleOnChange"
                                @on-complete="handleOnComplete" />
                            </div>
                        </div>
                        
                        <p class="text-xs mb-8 text-center">
                            Didn’t recieve a code?
                            <span
                            @click="handleResendOTP"
                            class="bg-[#1C2C35] text-white font-medium py-1 px-2 cursor-pointer rounded-md"
                            >{{isResend ? 'Please wait...': 'Resend'}}</span
                            >
                        </p>
                        
                        <div class="flex justify-center">
                            <button class="h-[60px] w-[70%] text-white font-semibold rounded-lg" :class="{'bg-[#1C2C3580] cursor-not-allowed' : otp.length !== 6, 'bg-[#1C2C35]': otp.length == 6}" :disabled="otp.length !== 6" 
                            @click.prevent="verifyUserBvnOtp()">{{ loading ? 'Please wait...' : 'Verify BVN'
                        }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
    <div class="flex justify-center" v-else>
        <button class="bg-[#1C2C35] h-[60px] w-[70%] text-white font-semibold rounded-lg"
        @click.prevent="openBVNPortal()">
        {{ loading ? 'Please wait...' : 'Verify BVN with NIBSS'}}
    </button>
</div>
</div>
</template>

<script setup>
import { ref, computed } from "vue";
import { sendBvnOtp, verifyBVN, createCustomer, verifyBVNFromNibss, verifyUserBVNDetails } from "../services";
import { createToaster } from '@meforma/vue-toaster';
const toast = createToaster({ position: 'top-right' });

const props = defineProps([
'personalData', 
'increaseIndex', 
'accountType', 
'progressIndex', 
'totalProgressIndex', 'decreaseIndex'
]);

const loading = ref(false);
const isBVN = ref(true);
const isBvnVerified = ref(true);
const otp = ref("");
const isResend = ref(false);

const handleOnChange = (e) => {
    otp.value = e;
};

const handleOnComplete = (e) => {
    otp.value = e;
};

const sendUserBvnOtp = async () => {
    try {
        loading.value = true;
        const response = await sendBvnOtp(props.personalData.bvn);
        loading.value = false;
        if(response.status == 200) {
            toast.success(response.message);
            isBVN.value = false;
        }
        if(response.status == 404) {
            toast.error(response.message);
            isBvnVerified.value = false;
        }
        // if (response.status == 200) {
            //     props.increaseIndex();
            // }
        } catch (err) {
            loading.value = false;
            console.log(err)
            toast.error(err.response.data.message || err.response.message);
        }
    }
    
    const handleResendOTP = async () => {
        try {
            isResend.value = true;
            const response = await sendBvnOtp(props.personalData.bvn);
            toast.success(response.message);
            isResend.value = false;
        } catch(err) {
            isResend.value = false;
            console.log(err)
            toast.error(err.response.data.message || err.response.message);
        }
    }
    
    const verifyUserBvnOtp = async () => {
        try {
            loading.value = true;
            const response = await verifyBVN(props.personalData.bvn, otp.value);
            loading.value = false;
            if(response.status == 200) {
                createCustomerAccount();
            }
        } catch (err) {
            loading.value = false;
            console.log(err)
        }
    }
    
    const createCustomerAccount = async () => {
        const payload = {
            type: props.accountType, ...props.personalData
        }
        try {
            loading.value = true;
            const response = await createCustomer(payload);
            loading.value = false;
            if(response.status == 200) {
                toast.success(response.message);
                props.increaseIndex();
            }
            else {
                toast.error(response.message);
            }
        } catch (err) {
            loading.value = false;
            console.log(err)
        }
    }
    
    const openBVNPortal = async () => {
        try {
            loading.value = true;
            const response = await verifyBVNFromNibss();
            console.log(response.data);
            if(response.data) {
                console.log(response.data.consent_url);
                const newWindow = window.open(response.data.consent_url, '_blank', 'width=600,height=400');
                if (newWindow) {
                    newWindow.focus();
                    const checkIfClosed = () => {
                    if (newWindow.closed) {
                        clearInterval(interval);
                        verifyBVNDetails();
                    }
                };
                const interval = setInterval(checkIfClosed, 1000); 
                }
            }
            else {
                toast.error("Invalid verification");
            }
        } catch (err) {
            loading.value = false;
            console.log(err)
        }
    }

    const verifyBVNDetails = async () => {
        try {
            loading.value = true;
            const response = await verifyUserBVNDetails(props.personalData.bvn);
            loading.value = false;
            console.log(response);
            if(response.success) {
                toast.success(response.message || "BVN successfully verified");
                props.increaseIndex();
            }
            else {
                toast.error(response.message);
            }
        } catch (err) {
            loading.value = false;
            console.log(err)
        }
    }
</script>

<style>
.one,
.two,
.three,
.four,
.five,
.six {
    width: 56px;
    height: 56px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-weight: 300;
}

@media screen and (max-width: 640px) {
    
    .one,
    .two,
    .three,
    .four,
    .five,
    .six {
        width: 46px;
        height: 46px;
    }
}
</style>