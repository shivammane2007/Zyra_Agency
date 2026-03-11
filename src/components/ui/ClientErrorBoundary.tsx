"use client"

import * as React from "react"

type ClientErrorBoundaryProps = {
  children: React.ReactNode
  fallback?: React.ReactNode
}

type ClientErrorBoundaryState = {
  hasError: boolean
}

export class ClientErrorBoundary extends React.Component<
  ClientErrorBoundaryProps,
  ClientErrorBoundaryState
> {
  state: ClientErrorBoundaryState = {
    hasError: false,
  }

  static getDerivedStateFromError(): ClientErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null
    }

    return this.props.children
  }
}