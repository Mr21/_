Mr21.Hash = {
	hash: new URLHash(),
	rub: function(rub) {
		if (rub === undefined) {
			return this.hash.get("rub");
		} else if (rub === null) {
			this.hash.set("home");
			this.hash.del("rub");
		} else {
			this.hash.set("rub", rub);
			this.hash.del("home");
		}
	},
	sub: function(sub) {
		if (sub === undefined)
			return this.hash.get("sub");
		else if (sub === null)
			this.hash.del("sub");
		else
			this.hash.set("sub", sub);
	}
};
