<template lang="html">
  <nav class="navbar navbar-toggleable-md navbar-light fixed-top bg-faded">
    <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="navbar-brand">{{$route.name}}</div>
    <!-- <div class="navbar-nav">
      <button class="btn btn-secondary">
        <i class="fa fa-refresh"></i>
      </button>
    </div> -->
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul v-if="logged" class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/feed">Лента</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/newpost">Добавить новость</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link class="nav-link" to="/profile">Профиль</router-link>
        </li> -->
				<li class="nav-item">
          <router-link class="nav-link" to="/dialogs">Диалоги</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">О нас</router-link>
        </li>
				<li class="nav-item">
          <a href="#" class="nav-link text-danger" @click="logout">Выйти</a>
        </li>
      </ul>
      <ul v-else class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="nav-link" to="/">Привет</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about">О нас</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navigation',
  props: ['logged'],
  mounted() {
    // Navbar and dropdowns
    var toggle = document.getElementsByClassName('navbar-toggler')[0],
      collapse = document.getElementsByClassName('navbar-collapse')[0],
      dropdowns = document.getElementsByClassName('dropdown');

    // Toggle if navbar menu is open or closed
    function toggleMenu(e) {
      e.stopPropagation();
      collapse.classList.toggle('collapse');
      collapse.classList.toggle('in');
    }

    // Close all dropdown menus
    function closeMenus() {
      for (var j = 0; j < dropdowns.length; j++) {
        dropdowns[j].getElementsByClassName('dropdown-toggle')[0].classList.remove('dropdown-open');
        dropdowns[j].classList.remove('open');
      }
    }

    function closeMenu() {
      collapse.classList.add('collapse');
      collapse.classList.remove('in');
    }

    // Add click handling to dropdowns
    for (var i = 0; i < dropdowns.length; i++) {
      dropdowns[i].addEventListener('click', function() {
        if (document.body.clientWidth < 768) {
          var open = this.classList.contains('open');
          closeMenus();
          if (!open) {
            this.getElementsByClassName('dropdown-toggle')[0].classList.toggle('dropdown-open');
            this.classList.toggle('open');
          }
        }
      });
    }

    // Close dropdowns when screen becomes big enough to switch to open by hover
    function closeMenusOnResize() {
      if (document.body.clientWidth >= 768) {
        closeMenus();
        collapse.classList.add('collapse');
        collapse.classList.remove('in');
      }
    }

    // Event listeners
    window.addEventListener('resize', closeMenusOnResize, false);
    document.getElementById('app').addEventListener('click', closeMenu);
    toggle.addEventListener('click', toggleMenu, false);
  },
	methods: {
		logout() {
			this.$emit('logout')
		}
	}
}
</script>

<style lang="css" scoped>

.refresh {
  display: inline-block;
}

/*
 * Open dropdowns on hover instead of click.
 */
@media (min-width: 768px) {
  .dropdown:hover {
    background: #e7e7e7;
  }
  .dropdown:hover > .dropdown-menu {
    display: block;
  }
}
/*
 * The following is needed since the dropdowns are <div> elements instead
 * of <a> elements
 */
.nav > li > div {
  position: relative;
  display: block;
  padding: 10px 15px;
  cursor: default;
}
.navbar-nav > li > div {
  padding-top: 15px;
  padding-bottom: 15px;
  line-height: 20px;
}
.navbar-default .navbar-nav > li > div {
  color: rgb(119, 119, 119);
}
.navbar-collapse {
  transition: all 1s ease, height 1s ease;
}
.navbar-collapse.in {
  /*height: auto;
  display: block !important;*/
}
.navbar-collapse.collapse {
  display: none;
  /*display: block !important;
  height: 0;
  transform: translateY(-20em);*/
}
.dropdown-open {
  background: #e7e7e7;
}
</style>
