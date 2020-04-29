<template>
  <div>
    <div
      :class="{
        'mobile-overlay': mobileNavDisplay,
      }"
      @click.self="mobileNavDisplay = false"
    >
      <!-- mobile navigation -->
      <nav
        class="mobile-menu"
        :class="{ 'mobile-menu--show': mobileNavDisplay }"
      >
          <button class="close-mobile-nav" @click="mobileNavDisplay = false">
            <span class="close-mobile-nav__icon">
              <span class="sr-only">Close Menu</span>
            </span>
          </button>

          <ul class="nav">
            <li v-for="link in navigationLinks">
              <router-link
                @click.native="mobileNavDisplay = false"
                :to="{name: link}">
                {{ link }}
              </router-link>
            </li>
          </ul>

      </nav>
    </div>

    <!-- Desktop header -->
    <header class="site-header">
      <div class="container">
        <div class="header-items">
          <a href="/" class="header-items__logo">
            <span class="sr-only">Bought By Many</span>
          </a>
          <nav
            class="header-items__menu menu-nav"
            role="presentation"
          >
            <ul class="header-menu hidden-xxs hidden-xs">
              <li class="header-menu__item" v-for="link in navigationLinks">
                <router-link :to="{name: link}">{{ link }}</router-link>
              </li>
            </ul>

            <button class="burger" @click="mobileNavDisplay = true">
              <span class="sr-only">Open Menu</span>
              <span class="burger__line"></span>
              <span class="burger__line"></span>
              <span class="burger__line"></span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  name: 'SiteHeader',
  data() {
    return {
      mobileNavDisplay: false,
      navigationLinks: ['Customers', 'Quotes', 'Policies'],
    }
  },
  watch: {
    mobileNavDisplay: {
      handler(newValue) {
        const bodyClasses = document.body.classList
        if (newValue) {
          bodyClasses.add('drawer-open')
        } else {
          bodyClasses.remove('drawer-open')
        }
      },
    },
  },
}
</script>

<style lang="scss">
@import '../sass/framework/framework.scss';

.site-header {
  @include shadow;

  background-color: $white;
  box-sizing: border-box;
  height: $header-height-sm;
  left: 0;
  padding-bottom: 15px;
  padding-top: 15px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: $zindex-header;

  @include breakpoint(sm-up) {
    height: $header-height-lg;
    padding-bottom: 20px;
    padding-top: 20px;
  }

  .header-items {
    align-items: center;
    display: flex;
    justify-content: space-between;

    &__logo {
      background-image: url('~../assets/svg/bbm-logo.svg');
      background-position: center center;
      background-repeat: no-repeat;
      background-size: contain;
      display: inline-block;
      height: 50px;
      width: 216px;

      @media screen and (min-width: 550px) {
        width: 290px;
      }
    }

    &__menu {
      align-items: center;
      display: flex;
      justify-content: flex-end;
    }

    &__icon {
      border: none;

      @media screen and (max-width: 374px) {
        display: none;
      }
    }
  }

  .header-menu {
    margin: 0;
    padding-left: 0;

    &__item {
      @include font--small;

      display: inline-block; // Gives items the same height as a button
      font-weight: 500;
      padding-right: $pad-h--lg;

      @include breakpoint(md-up) {
        padding-right: $pad-h--xxl;

        &:last-of-type {
          padding-right: 0;
        }
      }
    }
  }
}

.header-menu__item a {
  color: $text-color;
  display: inline-block;
  padding-bottom: $pad-v--xxxs + 2px;
  padding-top: $pad-v--xxxs + 2px;
  text-decoration: none;

  &:hover,
  &:focus {
    color: $color-eire-lighter;
  }
}

.mobile-overlay {
  background: rgba($color-sailor, 0.66);
  display: block !important;
  height: 100%;
  left: 0;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: $zindex-modal-overlay;
}

.nav {
  color: $text-color;
  list-style-type: none;
  margin: 0;
  padding-left: 0;

  li {
    margin-bottom: $pad-v--xs;
  }
}

.mobile-menu {
  background-color: $white;
  box-shadow: $color-sailor 1px 1px 3px;
  display: none;
  float: right;
  height: 100%;
  max-width: 335px;
  padding: $pad-v--md $pad-h--xl;
  width: 100%;

  &--show {
    display: block;
  }

  a {
    color: $color-sailor;
    text-decoration: none;

    &:hover,
    &:focus {
      color: $color-eire-darker;
    }
  }

  .close-mobile-nav {
    background-color: transparent;
    border: none;
    display: block;
    float: right;
    height: 24px;
    margin-bottom: $pad-v--md;
    padding: 0;
    width: 24px;

    &:hover,
    &:focus {
      cursor: pointer;

      .icon {
        background-image: url('../assets/svg/icon-green-cross.svg');
      }
    }
  }
}

.drawer-open {
  overflow: hidden;
}

.burger {
  background-color: transparent;
  border: none;
  margin-left: $pad-h--xxl;
  padding-bottom: $pad-v--xs;
  padding-top: $pad-v--xs;
  @include breakpoint(sm-down) {
    margin-left: $pad-h--sm;
  }
  @include breakpoint(sm-up) {
    display: none;
  }
  &:hover,
  &:focus {
    cursor: pointer;
    .burger__line {
      background-color: $color-eire-darker;
      cursor: pointer;
    }
  }
  &__line {
    background-color: $color-sailor;
    border-radius: 1.5px;
    display: block;
    height: 3px;
    margin-bottom: $pad-v--xxxs;
    width: 1.75rem;
    &:last-of-type {
      margin-bottom: 0;
    }
  }
}

.close-mobile-nav {
  &__icon {
    background-image: url('~../assets/svg/icon-green-cross.svg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: contain;
    display: inline-block;
    height: 100%;
    transition: opacity $animation-speed ease;
    width: 100%;
  }
  &:hover,
  &:focus {
    opacity: 0.5;
  }
}

.router-link-active {
  border-bottom: 2px solid $text-color
}
</style>
