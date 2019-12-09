<template>
    <div class="UnitPage">
      <div class="picPanel">
        <img v-for="p in [1,2,3,4,5]" class="pic" :src="params['photo'+p]"/>
      </div>
      <div class="info">
        <div class="topPanel">
          <div class="pic"></div>
          <div class="name">{{params.title}}</div>
          <div class="groupParams">
            <div v-for="p in params.parameters" class="param">{{p.name}} = {{p.value}}{{p.dimension}}</div>
          </div>
        </div>
        <div class="midPanel">
          <div class="col ">
            <div class="line">
              <div class="name">Материал: </div><div class="val text">{{mat}}</div>
            </div>
            <div class="line">
              <div class="name">Цвет: </div>
              <div class="val">
                <div class="colorBar">
                  <div class="color" v-for="c in params['unit-colors']" :style="'background-image: url('+c.texture+'); background-color: #'+c.rgb_hex+'; width: ' + 53/params['unit-colors'].length+'px;'"></div>
                </div>
              </div>
            </div>
            <div class="line">
              <div class="name">Вес: </div> <div class="val">{{params.weight}} кг</div>
            </div>
            <div class="line count">
              <div class="name">Количество: </div> <div class="val">{{params.count}} шт</div>
            </div>
            <div class="line">
              <div class="name">Мин. срок аренды: </div> <div class="val">{{params['rent-min-days']}} сут</div>
            </div>
            <div class="line">
              <div class="name">Стоимость первого дня: </div> <div class="val">{{params['first-day-cost']}} р/сут</div>
            </div>
            <div class="line">
              <div class="name">Стоимость последующих дней: </div> <div class="val">{{params['day-cost']}} р/сут</div>
            </div>
            <div class="line">
              <div class="name">Залог: </div> <div class="val">{{params.bail}} р</div>
            </div>

            <div class="line break">
              <div class="name">Ключевые слова: </div> <div class="val" ><span v-for="w in params['keywords-info']" class="kw">#{{w.word}}</span></div>
            </div>
            <div class="line" v-if="params.description">
              <div class="name">Комментарий: </div> <div class="val">{{params.description}}</div>
            </div>
          </div>
        </div>
        <div class="botPanel">
          <div class="line">
            <div class="name">Мин. срок аренды: </div> <div class="val">{{params['rent-min-days']}} сут</div>
          </div>
          <div class="line">
            <div class="name">Стоимость первого дня: </div> <div class="val">{{params['first-day-cost']}} р/сут</div>
          </div>
          <div class="line">
            <div class="name">Стоимость последующих дней: </div> <div class="val">{{params['day-cost']}} р/сут</div>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
    export default {
      name: "UnitPage",
      data: function () {
          return {
            photo: '12345',
            params:{"type":"unit","id":1,"weight":12,"bail":22,"count":1,"title":"board","first-day-cost":2121,"rent-min-days":12,"day-cost":1212,"unit-group":2,"description":"adsfa xzcz 321 ","published":true,"parameters":[{"id":1,"name":"А","value":"12,3","dimension":"см"},{"id":2,"name":"H","value":"2.2","dimension":"см"},{"id":1,"name":"А","value":"12,3","dimension":"см"},{"id":2,"name":"H","value":"2.2","dimension":"см"},{"id":1,"name":"А","value":"12,3","dimension":"см"},{"id":2,"name":"H","value":"2.2","dimension":"см"},{"id":1,"name":"А","value":"12,3","dimension":"см"},{"id":2,"name":"H","value":"2.2","dimension":"см"}],"unit-materials":[{"id":168,"name":"падук"},{"id":3,"name":"агат"}],"sets":[],"keywords-info":[{"id":1,"word":"fine"},{"id":2,"word":"wow"}],"keywords":"fine wow","unit-colors":[{"id":7,"rgb_hex":"00A4FF","texture":"http://localhost:9000/static/img/units/texture/"},{"id":28,"rgb_hex":"B6F6FA","texture":"http://localhost:9000/static/img/units/texture/"},{"id":43,"rgb_hex":"FFF3DB","texture":"http://localhost:9000/static/img/units/texture/"},{"id":51,"rgb_hex":"","texture":"http://localhost:9000/static/img/units/texture/redwood.jpg"},{"id":65,"rgb_hex":"glas.jpg","texture":"http://localhost:9000/static/img/units/texture/glas.jpg"}],"group-info":{"groups":"[\"\\u0410\\u0440\\u043a\\u0438\", \"\\u0410\\u043d\\u0444\\u0438\\u043b\\u0430\\u0434\\u0430\"]","params":[{"id":1,"name":"А","dimension":"см","value":"12,3"},{"id":2,"name":"H","dimension":"см","value":"2.2"}]},"photo1":"http://localhost:9000/static/user_0/unit_1/photo1.jpg","photo2":"http://localhost:9000/static/user_0/unit_1/photo2.jpg","photo4":"http://localhost:9000/static/user_0/unit_1/photo4.jpg"},
          }
      },
      computed:{
        materialArr:function () {
          let arr = [];
          for (let m in this.params['unit-materials']){
            arr.push(this.params['unit-materials'][m].name);
          }
          return arr;
        },
        mat:function () {
          let ans = this.materialArr.join(', ');
          //if (ans.length>6)ans=ans.substring(0,5)+'...';
          return ans;
        },
      },
    }
</script>

<style lang="sass" scoped>
  $lgray: #f6f6f6
  $shadow: 0px 2px 5px rgba(0, 0, 0, 0.5)
  $myred: #CA1612
  .UnitPage
    background-color: $lgray
    box-shadow: $shadow
    width: 1100px
    height: 710px
    margin-left: 15px
    .picPanel
      display: inline-block
      margin-left: 30px
      margin-top: 30px
      .pic
        width: 100px
        height: 100px
        margin-bottom: 10px
        margin-right: 8px
        background-color: lightsalmon
        display: inline-block
        &:first-child
          display: block
          width: 424px
          height: 424px
    .info
      display: inline-block
      vertical-align: top
      margin-left: 20px
      margin-top: 30px
      .topPanel
        width: 600px
        min-height: 110px
        margin-bottom: 35px
        .pic
          background-color: lightgray
          margin-right: 10px
          float: right
          width: 145px
          height: 145px
        .name
          font-family: Philosopher
          font-weight: bold
          font-size: 24px
          margin-bottom: 15px
        .groupParams
          .param
            font-size: 18px
            width: 140px
            margin-bottom: 15px
            display: inline-block
      .midPanel
        .line
          margin-bottom: 15px
          font-size: 18px
          .name
            display: inline-block
            vertical-align: top
            margin-right: 5px
          .val
            display: inline-block
            vertical-align: top
          .colorBar
            vertical-align: top
            display: inline-block
            //height: 10px
            .color
              height: 14px
              display: inline-block
              background-size: cover
              border: solid 1px lightgray
              border-left: none
              &:first-child
                border-left: solid 1px lightgray
        .break
          margin-top: 40px
      .botPanel
        display: block
        vertical-align: bottom
        text-align: right
        margin-right: 20px
        margin-bottom: 30px
        .line
          margin-bottom: 15px
          font-size: 15.5px
          .name
            display: inline-block
            vertical-align: top
            margin-right: 5px
          .val
            display: inline-block
            vertical-align: top
</style>
