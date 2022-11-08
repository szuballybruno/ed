module.exports = function override(config, env) {

    const defaultRules = config.module.rules;

    const webpack5esmInteropRule = {
        test: /\.m?js/,
        resolve: {
            fullySpecified: false
        }
    };

    const newRulesList = [webpack5esmInteropRule, ...defaultRules];

    config.module.rules = newRulesList;

    return config;
};