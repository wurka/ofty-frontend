<template>
  <div v-if="shown" >
    <div class="bg"></div>
    <div class="ColorPicker">
      <div class="count">{{this.picked.length}}/{{this.lim}}</div>
      <div class="content">

        <div class="line">
          <div class="bar1 bar" v-for="b in colorData['group1']" :style="'background-color: #'+b.rgb_hex" @click="pick(b)"><img :class="pickedIdArr.includes(b.id) ? '' : 'hidden'" :src="host+'/static/img/units/border_38_112_2.png'"/></div>
        </div>
        <div class="line">
          <div class="bar1 bar" v-for="b in colorData['group2']" :style="'background-color: #'+b.rgb_hex" @click="pick(b)"><img :class="pickedIdArr.includes(b.id) ? '' : 'hidden'" :src="host+'/static/img/units/border_38_112_2.png'"/></div>
        </div>
        <div class="line">
          <div class="bar2 bar" v-for="b in colorData['group3']" :style="'background-color: #'+b.rgb_hex" @click="pick(b)"><img :class="pickedIdArr.includes(b.id) ? '' : 'hidden'" :src="host+'/static/img/units/border_182_38_2.png'"/></div>
        </div>
        <div class="line">
          <div class="bar3 bar" v-for="b in colorData['group4']" :style="'background-image: url('+b.texture+');'" @click="pick(b)"><img :class="pickedIdArr.includes(b.id) ? '' : 'hidden'" :src="host+'/static/img/units/border_86_112_2.png'"/></div>
        </div>
        <div class="line">
          <div class="bar3 bar" v-for="b in colorData['group5']" :style="'background-image: url('+b.texture+');'" @click="pick(b)"><img :class="pickedIdArr.includes(b.id) ? '' : 'hidden'" :src="host+'/static/img/units/border_86_112_2.png'"/></div>
        </div>
        <div class="btns">
          <div class="btn" @click="picked=applied.slice(); $emit('hideColorPicker',applied); hide(); ">Отмена</div>
          <div class="btn" @click="applied=picked.slice(); $emit('hideColorPicker',applied); hide(); ">Подтвердить</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {host, myClone} from './main'
    export default {
      name: "ColorPicker",
      props:['colorData'],
      data: function () {
          return {
            shown: false,
            picked:[],
            applied:[],
            host:host,
            lim:5
          }
      },
      computed:{
        idArr:function(){
          let ans = [];
          for (let g in this.colorData){
            for(let c in this.colorData[g]){
              ans.push(this.colorData[g][c].id);
            }
          }
          return ans;
        },
        pickedIdArr: function () {
          let ans = [];
          for (let i in this.picked){
            ans.push(this.picked[i].id);
          }
          return ans;
        }
      },
      methods:{
        show: function(picked){
          //picked=[];
          this.shown=true;
          this.picked=myClone(picked);
          this.applied=myClone(picked);
          //this.autopick(picked);
        },
        hide: function(){
          this.shown=false;
        },
        pick:function (arg) {
          if (this.pickedIdArr.includes(arg.id)) this.picked.splice(this.pickedIdArr.indexOf(arg.id),1);
          else {
            if (this.picked.length>this.lim-1) {
              alert('Допустимо не более '+this.lim+' цветов!');
              return
            }
            this.picked.push(arg);
          }
          console.log(arg);
          console.log(this.picked);
        },
        autopick:function (colors) {
          this.picked = [];
          for (i in colors){
            this.picked.push(i.id);
          }
          this.applied = myClone(this.picked);
          //this.$emit('hideColorPicker',this.applied);
        }
      },
    }
</script>


<style lang="sass" scoped>
  $shadow: 0px 2px 5px rgba(0, 0, 0, 0.5)
  .bg
    background-color: darkgray
    opacity: 0.3
    position: fixed
    left: 0
    top: 0
    height: 100vh
    width: 100vw
    z-index: 2
  .ColorPicker
    background-color: white
    //border: solid lightgray 1px
    box-shadow: $shadow
    height: 710px
    width: 1010px
    position: absolute
    margin: -5px 0px 0px 40px
    z-index: 2
    .count
      //position: fixed
      font-size: 18px
      text-align: right
      margin-top: 12px
      margin-right: 35px
    .content
      margin-top: 10px
      margin-left: 29px

      .line
        margin-bottom: 18px
        .bar
          margin-right: 10px
          //background-color: black
          cursor: pointer
          display: inline-block
          box-shadow: $shadow
        .bar1
          height: 112px
          width: 38px
        .bar2
          height: 38px
          width: 182px
        .bar3
          height: 112px
          width: 86px
      .btns
        text-align: center
        margin-top: 35px
        .btn
          text-align: center
          display: inline-block
          margin-right: 45px
          padding-top: 8px
          font-family: Philosopher
          font-size: 18px
          box-shadow: $shadow
          height: 30px
          width: 200px



</style>
