<template>
  <div id="app">
    <header>
      <h1>{{ name }}</h1>
      <p>{{ tagline }}</p>
    </header>
    <nav>
      <ul>
        <li><a href="#about">About</a></li>
        <li><a href="#portfolio">Portfolio</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
    <section id="about">
      <h2>About Me</h2>
      <p>{{ about }}</p>
    </section>
    <section id="portfolio">
      <h2>Portfolio</h2>
      <div class="portfolio-item" v-for="item in portfolio" :key="item.id">
        <img :src="item.image" :alt="item.title" />
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
      </div>
    </section>
    <section id="contact">
      <h2>Contact</h2>
      <p>{{ contact }}</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Andrew Dabson",
      tagline: "Designer & Developer",
      about: "Regrettably haven't indulged recreation design since slaving away at an office job. Turns out you can call yourself an AI designer / prompt engineer these days & I'm here for it.",
      portfolio: [
        {
          id: 1,
          title: "King",
          description: "Where's my Burger!?",
          image: "img/king.png"
        },
        {
          id: 2,
          title: "Skate",
          description: "Simply Gorgeous, darling",
          image: "img/skate.png"
        },
        {
          id: 3,
          title: "Horse",
          description: "Don't I look handsome?",
          image: "img/horse.png"
        },
        {
          id: 4,
          title: "Prince",
          description: "..of Egypt in his emo era.",
          image: "img/prince.png"
        },
      ],
      contact: "github.com/adabson"
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
}

header {
  margin-bottom: 20px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin: 0 10px;
}

.portfolio-item {
  margin: 20px 0;
}

.portfolio-item img {
  max-width: 100%;
  height: auto;
}
</style>
