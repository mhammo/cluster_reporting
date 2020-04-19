<template>
  <b-navbar sticky toggleable="lg" class="py-4">
    <b-navbar-brand href="#">
      <img src="/logo.jpg" />
    </b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <template v-if="user">
          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->

            <template v-slot:button-content>
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </template>
        <template v-else>
          <b-button class="mx-1" variant="outline-secondary">Register</b-button>
          <b-button class="mx-1" variant="primary">Log in</b-button>
        </template>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  props: {
    user: null
  }
}
</script>
