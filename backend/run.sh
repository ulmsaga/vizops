#!/bin/bash
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk-17.0.5.jdk/Contents/Home
exec mvn spring-boot:run "$@"
