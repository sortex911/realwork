import subprocess
import sys
import os

def run_git_command(args, cwd=None):
    """Run a git command and stream output."""
    result = subprocess.run(["git"] + args, cwd=cwd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"Error running git {' '.join(args)}:", result.stderr.strip())
        sys.exit(1)
    return result.stdout.strip()

def main():
    # Determine project root (assume script is placed in project root)
    project_root = os.path.abspath(os.path.dirname(__file__))
    print(f"Project root: {project_root}")

    # Stage all changes
    print("Staging all changes...")
    run_git_command(["add", "."], cwd=project_root)

    # Commit with a message (default or provided)
    commit_message = "Automated commit of all changes"
    if len(sys.argv) > 1:
        commit_message = " ".join(sys.argv[1:])
    print(f"Committing with message: '{commit_message}'")
    # Check if there is anything to commit
    status = run_git_command(["status", "--porcelain"], cwd=project_root)
    if not status:
        print("No changes to commit.")
    else:
        run_git_command(["commit", "-m", commit_message], cwd=project_root)

    # Push to remote
    print("Pushing to remote origin/main...")
    run_git_command(["push", "origin", "main"], cwd=project_root)
    print("Push completed successfully.")

if __name__ == "__main__":
    main()
