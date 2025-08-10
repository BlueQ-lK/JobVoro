import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-background border-t px-16">
      <div className="container py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Image src={"jobvoro.png"} alt="jobvoro" width={40} height={40} />
              <span className="text-xl font-bold">JobVoro</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              The privacy-first job application tracker for professionals who
              value discretion and organization.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="#features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#demo"
                  className="hover:text-primary transition-colors"
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center text-sm text-muted-foreground">
          <p>
            &copy; 2024 JobVoro. All rights reserved. Built with privacy in
            mind.
          </p>
        </div>
      </div>
    </footer>
  );
}
