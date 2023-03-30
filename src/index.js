class DataType {
	constructor() {
		this.name = null;
		this.regexes = {};
		this.searchtype = "one";
	}

	/**
	 * Sets the name of the DataType instance.
	 * @param {string} name - The name of the DataType.
	 */
	setName(name) {
		this.name = name;
		return this;
	}

	/**
	 * Adds a new regex pattern to the DataType instance.
	 * @param {string} name - The name of the regex pattern.
	 * @param {RegExp} regex - The regex pattern.
	 */
	addRegex(name, regex) {
		this.regexes[name] = regex;
		return this;
	}

	/**
	 * Removes a regex pattern from the DataType instance.
	 * @param {string} regexName - The name of the regex pattern to remove.
	 */
	removeRegex(regexName) {
		delete this.regexes[regexName];
		return this;
	}

	/**
	 *
	 * @param {string} type - The search type. Valid types are "one" and "all" (One regex must match, or all regexes must match).
	 * @throws {Error} - Throws an error if the search type is not "one" or "all".
	 */
	setSearchType(type) {
		if (type === "one" || type === "all") {
			this.searchtype = type;
		} else {
			throw new Error(
				`Invalid search type ${type} | Valid types are "one" and "all"`
			);
		}

		return this;
	}
}

class Validator {
	constructor() {
		this.datatype = null;
	}

	/**
	 * Sets the DataType instance for the Validator.
	 * @param {DataType} datatype - The DataType instance.
	 * @throws {Error} - Throws an error if the datatype is not an instance of DataType.
	 */
	setDatatype(datatype) {
		if (datatype instanceof DataType) {
			this.datatype = datatype;
		} else {
			throw new Error(`Invalid datatype ${datatype}`);
		}
		return this;
	}

	/**
	 * Validates that a value is the correct type.
	 * @param {string} value - The value to validate.
	 * @returns {boolean} - Returns true if the value matches (depending on the searchtype, any/one) of the regex patterns, false otherwise.
	 */
	validate(value) {
		const regexes = this.datatype.regexes;

		if (this.datatype.searchtype === "one") {
			for (const regexName in regexes) {
				if (regexes[regexName].test(value)) {
					return true;
				}
			}
		} else if (this.datatype.searchtype === "all") {
			for (const regexName in regexes) {
				if (!regexes[regexName].test(value)) {
					return false;
				}
			}
			return true;
		} else {
			throw new Error(
				`Invalid search type ${this.searchtype} | Valid types are "one" and "all"`
			);
		}
		return false;
	}
}

module.exports = {
	Validator,
	DataType,
	datatypes: {
		email: new DataType()
			.setName("email")
			.addRegex(
				"email",
				/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
			),
		phone: new DataType()
			.setName("phone")
			.addRegex("With dashes", /^\+?\d{0,}\d{2}-?\d{3}-?\d{4}$/)
			.addRegex("Without dashes", /^\+?\d{0,}\d{9}$/)
			.setSearchType("one"),

		postalCode: new DataType()
			.setName("postalCode")
			.addRegex("Postal code", /^\d{5}(-\d{4})?$/),

		ipv4: new DataType()
			.setName("ipv4")
			.addRegex(
				"ipv4",
				/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/
			),

		ipv6: new DataType()
			.setName("ipv6")
			.addRegex("Full form", /^([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}$/)
			.addRegex("With trailing double colon", /^([0-9a-fA-F]{1,4}:){1,7}:$/)
			.addRegex(
				"With one group of zeroes compressed",
				/^([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}$/
			)
			.addRegex(
				"With two groups of zeroes compressed",
				/^([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}$/
			)
			.addRegex(
				"With three groups of zeroes compressed",
				/^([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}$/
			)
			.addRegex(
				"With four groups of zeroes compressed",
				/^([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}$/
			)
			.addRegex(
				"With five groups of zeroes compressed",
				/^([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}$/
			)
			.addRegex(
				"With one group of eight hexadecimal digits",
				/^[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})$/
			)
			.addRegex("With only a double colon", /^:((:[0-9a-fA-F]{1,4}){1,7}|:)$/)
			.addRegex(
				"Link-local address",
				/^fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}$/
			)
			.addRegex(
				"IPv4-mapped IPv6 address",
				/^::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/
			)
			.addRegex(
				"IPv4-embedded IPv6 address",
				/^([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])$/
			)
			.setSearchType("one"),
	},
};
