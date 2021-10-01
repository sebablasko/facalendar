<template>
  <div :class="$style.content">
    <div :id="$style.starsContainer">
			<div :id='$style.stars'></div>
			<div :id='$style.stars2'></div>
			<div :id='$style.stars3'></div>
      <div :class="$style.memories">
        <div
          v-for="(mem, index) in members"
          :key="index"
          :class="$style.item">
            <img :src="mem.img"/>
        </div>
      </div>
      <div :class="$style.legend">
        #GrandeFinancial
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

import forest from '@/assets/forest4.mp3';

export default {
  name: "Memoriam",
  data() {
    return {
      f: undefined,
    };
  },
  computed: {
    ...mapState(['remote']),
    members() {
      return this.remote.memoriam;
    },
  },
  mounted() {
    this.f= new Audio(forest);
    this.f.play();
    this.f.loop = true;
  },
  beforeDestroy() {
    this.f.pause();
  }
};
</script>

<style module lang="scss">
.content {
  display: flex;
  flex-direction: column;
  padding: 2em;
  width: 50em;
  overflow: hidden;
  background-image: url('../assets/nube.png');
  background-repeat: no-repeat;
  background-size: cover;
  // background-blend-mode: luminosity;
}
.memories {
  margin: 4em;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}
.item {
  display: flex;
  margin: 1em;
  box-shadow: 0 0 1em 0.1em var(--light-primary-color-70);
	animation-name: fade-in;
	animation-fill-mode: both;
	animation-duration: 3s;
}
.legend {
  font-size: 3em;
  text-align: center;
  font-family: 'Dancing Script', cursive;
}
@keyframes fade-in {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
$animationDelay: 1;
@for $i from 1 through 11 {
	.item:nth-of-type(#{$i}) {
		animation-delay: #{1+($i)}s;
  }
}

@mixin translate50
{
  -webkit-transform: translate(-150, -50%);
  -ms-transform: translate(-150, -50%);
  -o-transform: translate(-150, -50%);
  transform: translate(-150, -50%);
}

@mixin roundedCorners
{
  -webkit-border-radius: 50%; 
  -moz-border-radius: 50%; 
  border-radius: 50%;
}

@mixin rotateBase
{
  -webkit-transform: rotate3d(-1, 1, 0, 0deg);
  -ms-transform: rotate3d(-1, 1, 0, 0deg);
  -o-transform: rotate3d(-1, 1, 0, 0deg);
  transform: rotate3d(-1, 1, 0, 0deg);
}

@mixin rotateRight
{
  -webkit-transform: rotate3d(-1, 1, 0, 30deg);
  -ms-transform: rotate3d(-1, 1, 0, 30deg);
  -o-transform: rotate3d(-1, 1, 0, 30deg);
  transform: rotate3d(-1, 1, 0, 30deg);
}

@mixin rotateLeft
{
  -webkit-transform: rotate3d(-1, 1, 0, -30deg);
  -ms-transform: rotate3d(-1, 1, 0, -30deg);
  -o-transform: rotate3d(-1, 1, 0, -30deg);
  transform: rotate3d(-1, 1, 0, -30deg);
}

// n is number of stars generated
@function generateStars ($n)
{ 
  $value: '#{0} #{random(1800)}px #{random(1800)}px #FFFFFF';

  @for $i from 2 through $n
  {
    $value: '#{$value} , #{random(1800)}px #{random(1800)}px #FFFFFF';
    // $value: '#{$value} , #{random(1800)}px #{random(1800)}px #{rgb(random(255), random(255), random(255))}';
  }

  @return unquote($value);
}

$stars-small:  generateStars(700);
$stars-medium: generateStars(200);
$stars-big:    generateStars(200);

#starsContainer
{
  // height: 30em;
  // width: 100%;
  // background: radial-gradient(ellipse at bottom, #1B2735 0%, #191F24 100%);
  overflow: hidden;
  @include translate50;
}
    
#stars
{
  width: 1px;
  height: 1px;
  background: transparent;
  box-shadow: $stars-small;
  animation : animateStars 15.5s ease-in-out infinite;
  @include roundedCorners;

  &::after
  {
    content: " ";
    position: absolute;
    margin: auto;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 1px;
    height: 1px;
    background: transparent;
    box-shadow: $stars-small;
    @include roundedCorners;
  }
}
    
#stars2
{
  width: 2px;
  height: 2px;
  background: transparent;
  box-shadow: $stars-medium;
  animation : animateStars 20s ease-in-out infinite;
  @include roundedCorners;
    
  &::after
  {
    content: " ";
    position: absolute;
    margin: auto;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 2px;
    height: 2px;
    background: transparent;
    box-shadow: $stars-medium;
    @include roundedCorners;
  }
}
    
#stars3
{
  width: 4px;
  height: 4px;
  background: transparent;
  box-shadow: $stars-big;
  animation : animateStars 21.5s ease-in-out infinite;
  @include roundedCorners;
    
  &:after
  {
    content: " ";
    position: absolute;
    margin: auto;
    top: 0; left: 0; right: 0; bottom: 0;
    width: 4px;
    height: 4px;
    background: transparent;
    box-shadow: $stars-big;
    @include roundedCorners;
  }
}

@keyframes animateStars
{
  0%{@include rotateBase;}
  25%{@include rotateRight;}
  50%{@include rotateBase;}
  75%{@include rotateLeft;}
  100%{@include rotateBase;}
}
</style>