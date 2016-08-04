function checkEquality(prime, comparable) {
    if (!comparable || prime.length != comparable.length) {
            return false;
    }
    for (var i=0; i<prime.length; i++) {
        if (prime[i] != comparable[i]) {
              return false
        }
    }
    return true;
}