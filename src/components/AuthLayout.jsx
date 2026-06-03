import React from "react";

export default function AuthLayout({ icon: Icon, title, subtitle, footer, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          {Icon && (
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary mb-4">
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
          )}
          {title && <h2 className="text-2xl font-bold tracking-tight">{title}</h2>}
          {subtitle && <p className="text-sm text-muted-foreground mt-2">{subtitle}</p>}
        </div>
        
        <div className="bg-card p-6 border rounded-lg shadow-sm">
          {children}
        </div>
        
        {footer && (
          <div className="text-center mt-6 text-sm text-muted-foreground">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
