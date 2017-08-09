<template>
<div>
    <staff></staff>
    <pay></pay>
    <kitchen></kitchen>
    <other></other>
    <test></test>
<!-- totalstaff+totalpay+totalkitchen+totalother+totaltest -->
  <!-- <p class="font">本月总支出：{{ all }}</p> -->
</div>
</template>
<script>
  import store from '../../store/index'
  import test from './test'
  import other from './other'
  import kitchen from './kitchen'
  import pay from './pay'
  import staff from './staff'
  export default {
    name: 'index',
    components:{
        // test,
        other,
        kitchen,
        pay,
        staff
    }
    
  }
</script>
