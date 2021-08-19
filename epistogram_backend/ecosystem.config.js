module.exports = {
    apps: [
        {
            name: "epistogram_dev",
            script: "./main.js",
            env_development: {
                NODE_ENV: "development",
                TEST_ENV_VAR: "dev_test_env_var"
            }
        },
        {
            name: "epistogram_demo",
            script: "./main.js",
            env_demo: {
                NODE_ENV: "demo",
                TEST_ENV_VAR: "demo_test_env_var"
            }
        }
    ]
}