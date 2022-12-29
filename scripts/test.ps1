$pwd_abs = Resolve-Path ${PWD}
$dot_abs = Resolve-Path ./
$pro_abs = Resolve-Path ${PSScriptRoot}

echo "Pwd: ${pwd_abs}"
echo "Dot: ${dot_abs}"
echo "Pro: ${pro_abs}"