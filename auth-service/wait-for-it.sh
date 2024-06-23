#!/bin/sh

TIMEOUT=15
QUIET=0

echoerr() {
    if [ $QUIET -ne 1 ]; then
        echo "$@" 1>&2
    fi
}

usage() {
    cat << USAGE >&2
Usage:
    ./wait-for-it.sh host:port [-t timeout] [-q]
    -t TIMEOUT
    -q quiet mode
USAGE
    exit 1
}

wait_for() {
    local HOST=$1
    local PORT=$2

    local i=0
    while [ $i -lt $TIMEOUT ]; do
        if nc -z $HOST $PORT; then
            break
        fi
        i=$((i + 1))
        sleep 1
    done

    if [ $i -eq $TIMEOUT ]; then
        echoerr "Operation timed out"
        exit 1
    fi
}

while [ $# -gt 0 ]; do
    case "$1" in
        *:*)
            HOST=$(printf "%s\n" "$1" | cut -d : -f 1)
            PORT=$(printf "%s\n" "$1" | cut -d : -f 2)
            shift 1
            ;;
        -t)
            TIMEOUT="$2"
            if [ $TIMEOUT -lt 1 ]; then
                echoerr "Error: invalid timeout '$TIMEOUT'"
                exit 1
            fi
            shift 2
            ;;
        -q)
            QUIET=1
            shift 1
            ;;
        --)
            shift
            break
            ;;
        -*)
            echoerr "Error: unknown option '$1'"
            usage
            ;;
        *)
            usage
            ;;
    esac
done

if [ -z "$HOST" ] || [ -z "$PORT" ]; then
    echoerr "Error: you need to provide a host and port to test."
    usage
fi

wait_for $HOST $PORT

echo "Starting command: $@"
exec "$@"

