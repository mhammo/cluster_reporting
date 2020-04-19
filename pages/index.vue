<template>
  <b-container fluid class="main-content">
    <h1 class="header">Explore our industrial clusters</h1>
    <p
      class="sub_header"
    >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <b-row>
      <b-col cols lg="4">
        <div class="entry_card">
          <h2>Explore by region</h2>
          <div class="entry_card__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <a href="/regions" role="button" class="btn btn-primary">Explore</a>
          </div>
        </div>
      </b-col>
      <b-col cols lg="4">
        <div class="entry_card">
          <h2>Explore by cluster organisation</h2>
          <div class="entry_card__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <a
              href="/regions"
              role="button"
              class="btn btn-primary disabled"
              disabled="disabled"
            >Explore</a>
          </div>
        </div>
      </b-col>
      <b-col cols lg="4">
        <div class="entry_card">
          <h2>Explore by sector</h2>
          <div class="entry_card__body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <a
              href="/regions"
              role="button"
              class="btn btn-primary disabled"
              disabled="disabled"
            >Explore</a>
          </div>
        </div>
      </b-col>
    </b-row>
  </b-container>
</template>

<style lang="scss" scoped>
@import '~assets/scss/variables';

.main-content {
  max-width: 1500px;
}

.header {
  text-align: center;
  margin: 60px auto 30px auto;
}

.sub_header {
  max-width: 750px;
  text-align: center;
  margin: 0 auto 60px auto;
}

.entry_card {
  padding: 60px 50px;
  min-height: 540px;
  text-align: center;
  background: $color-background-secondary;
  display: flex;
  flex-direction: column;

  h2 {
    margin-bottom: 30px;
  }

  .entry_card__body {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    justify-content: space-between;

    .btn {
      align-self: center;
    }
  }
}
</style>