function User() {
	var logged = false;
	var password = "";
	var groupName = "";


	this.login = function() {
		this.logged = true;
		this.groupName = document.getElementById("name").value;
		this.password = document.getElementById("password").value;
	}

	this.deleteLogin = function() {
		var elem = document.getElementsByClassName('container')[0];
    elem.parentNode.removeChild(elem);
	}

	this.getGroupName = function() {
		return this.groupName;
	}

	this.getPass = function() {
		return this.password;
	}

	this.isLogged = function() {
		return this.logged;
	}
}
