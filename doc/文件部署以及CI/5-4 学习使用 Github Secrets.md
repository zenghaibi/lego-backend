## About encrypted secrets

Secrets are encrypted environment variables that you create in an organization, repository, or repository environment. The secrets that you create are available to use in GitHub Actions workflows. GitHub uses a [libsodium sealed box](https://libsodium.gitbook.io/doc/public-key_cryptography/sealed_boxes) to help ensure that secrets are encrypted before they reach GitHub and remain encrypted until you use them in a workflow.

对于存储在组织级别的密码，可以使用访问策略来控制哪些仓库可以使用组织密码。 组织级密码允许在多个仓库之间共享密码，从而减少创建重复密码的需要。 在一个位置更新组织密码还可确保更改在使用该密码的所有仓库工作流程中生效。

For secrets stored at the environment level, you can enable required reviewers to control access to the secrets. A workflow job cannot access environment secrets until approval is granted by required approvers.


**Note** : 如果 GitHub Actions 工作流需要访问支持 OpenID Connect (OIDC) 的云提供商提供的资源，则可以将工作流配置为直接向云提供商进行身份验证。 这样就可以停止将这些凭据存储为长期存在的机密，并提供其他安全优势。 有关详细信息，请参阅“[关于使用 OpenID Connect 进行安全强化](https://docs.github.com/cn/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect)”


### Naming your secrets

以下规则适用于密码名称：

* 密钥名称只能包含字母数字字符（`[a-z]`、`[A-Z]`、`[0-9]`）或下划线 (`_`)。 不允许空格。
* 机密名称不得以 `GITHUB_` 前缀开头。
* 密码名称不能以数字开头。
* 机密名称不区分大小写。
* 密码名称在所创建的级别上必须是唯一的。
  For example, a secret created at the environment level must have a unique name in that environment, a secret created at the repository level must have a unique name in that repository, and a secret created at the organization level must have a unique name at that level.
  如果具有相同名称的机密存在于多个级别，则级别最低的机密优先。 例如，如果组织级别密码的名称与仓库级别的密码相同，则仓库级别的密码优先。 Similarly, if an organization, repository, and environment all have a secret with the same name, the environment-level secret takes precedence.

To help ensure that GitHub redacts your secret in logs, avoid using structured data as the values of secrets. For example, avoid creating secrets that contain JSON or encoded Git blobs.

### Accessing your secrets

To make a secret available to an action, you must set the secret as an input or environment variable in the workflow file. Review the action's README file to learn about which inputs and environment variables the action expects. For more information, see "[Workflow syntax for GitHub Actions](https://docs.github.com/cn/articles/workflow-syntax-for-github-actions/#jobsjob_idstepsenv)."

You can use and read encrypted secrets in a workflow file if you have access to edit the file. For more information, see "[Access permissions on GitHub](https://docs.github.com/cn/github/getting-started-with-github/access-permissions-on-github)."

警告：GitHub 自动将密码编写到日志，但应避免有意将密码打印到日志。

Organization and repository secrets are read when a workflow run is queued, and environment secrets are read when a job referencing the environment starts.

You can also manage secrets using the REST API. For more information, see "[Secrets](https://docs.github.com/cn/rest/reference/actions#secrets)."

### Limiting credential permissions

When generating credentials, we recommend that you grant the minimum permissions possible. For example, instead of using personal credentials, use [deploy keys](https://docs.github.com/cn/developers/overview/managing-deploy-keys#deploy-keys) or a service account. Consider granting read-only permissions if that's all that is needed, and limit access as much as possible. When generating a personal access token (classic), select the fewest scopes necessary. When generating a fine-grained personal access token, select the minimum repository access required.

**Note:** You can use the REST API to manage secrets. For more information, see "[GitHub Actions secrets API](https://docs.github.com/cn/rest/reference/actions#secrets)."

## Creating encrypted secrets for a repository

要为个人帐户存储库创建机密，你必须是存储库所有者。 要为组织存储库创建密码，必须具有 `admin` 访问权限。

1. On GitHub.com, navigate to the main page of the repository.
2. 在存储库名称下，单击 “设置”。![“存储库设置”按钮](https://docs.github.com/assets/cb-27528/images/help/repository/repo-actions-settings.png)
3. In the "Security" section of the sidebar, select  ** Secrets** , then click  **Actions** .
4. Click  **New repository secret** .
5. Type a name for your secret in the **Name** input box.
6. Enter the value for your secret.
7. Click  **Add secret** .

If your repository has environment secrets or can access secrets from the parent organization, then those secrets are also listed on this page.

## Creating encrypted secrets for an environment

要为个人帐户存储库中的环境创建密码，你必须是存储库所有者。 要为组织存储库中的环境创建机密，必须具有 `admin` 访问权限。

1. On GitHub.com, navigate to the main page of the repository.
2. 在存储库名称下，单击 “设置”。![“存储库设置”按钮](https://docs.github.com/assets/cb-27528/images/help/repository/repo-actions-settings.png)
3. 在左侧边栏中，单击“环境”。
4. Click on the environment that you want to add a secret to.
5. Under  **Environment secrets** , click  **Add secret** .
6. Type a name for your secret in the **Name** input box.
7. Enter the value for your secret.
8. Click  **Add secret** .

## Creating encrypted secrets for an organization

When creating a secret in an organization, you can use a policy to limit which repositories can access that secret. For example, you can grant access to all repositories, or limit access to only private repositories or a specified list of repositories.

要在组织级别创建机密，必须具有 `admin` 访问权限。

1. On GitHub.com, navigate to the main page of the organization.
2. 在组织名称下，单击“设置”。![组织设置按钮](https://docs.github.com/assets/cb-21603/images/help/organizations/organization-settings-tab-with-overview-tab.png)
3. In the "Security" section of the sidebar, select  ** Secrets** , then click  **Actions** .
4. Click  **New organization secret** .
5. Type a name for your secret in the **Name** input box.
6. Enter the **Value** for your secret.
7. From the **Repository access** dropdown list, choose an access policy.
8. Click  **Add secret** .

## Reviewing access to organization-level secrets

You can check which access policies are being applied to a secret in your organization.

1. On GitHub.com, navigate to the main page of the organization.
2. 在组织名称下，单击“设置”。![组织设置按钮](https://docs.github.com/assets/cb-21603/images/help/organizations/organization-settings-tab-with-overview-tab.png)
3. In the "Security" section of the sidebar, select  ** Secrets** , then click  **Actions** .
4. The list of secrets includes any configured permissions and policies. For example:![Secrets list](https://docs.github.com/assets/cb-17485/images/help/settings/actions-org-secrets-list.png)
5. For more details on the configured permissions for each secret, click  **Update** .

## Using encrypted secrets in a workflow

**Notes:**

* 除 `GITHUB_TOKEN` 外，当从分支存储库触发工作流时，机密不会传递给运行器。
* Secrets are not automatically passed to reusable workflows. For more information, see "[Reusing workflows](https://docs.github.com/cn/actions/using-workflows/reusing-workflows#passing-inputs-and-secrets-to-a-reusable-workflow)."

To provide an action with a secret as an input or environment variable, you can use the `secrets` context to access secrets you've created in your repository. For more information, see "[Contexts](https://docs.github.com/cn/actions/learn-github-actions/contexts)" and "[Workflow syntax for GitHub Actions](https://docs.github.com/cn/github/automating-your-workflow-with-github-actions/workflow-syntax-for-github-actions)."

```yaml
steps:
  - name: Hello world action
    with: # Set the secret as an input
      super_secret: ${{ secrets.SuperSecret }}
    env: # Or as an environment variable
      super_secret: ${{ secrets.SuperSecret }}
```

Secrets cannot be directly referenced in `if:` conditionals. Instead, consider setting secrets as job-level environment variables, then referencing the environment variables to conditionally run steps in the job. For more information, see "[Context availability](https://docs.github.com/cn/actions/learn-github-actions/contexts#context-availability)" and [`jobs.<job_id>.steps[*].if`](https://docs.github.com/cn/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsif).

If a secret has not been set, the return value of an expression referencing the secret (such as `${{ secrets.SuperSecret }}` in the example) will be an empty string.

Avoid passing secrets between processes from the command line, whenever possible. Command-line processes may be visible to other users (using the `ps` command) or captured by [security audit events](https://docs.microsoft.com/windows-server/identity/ad-ds/manage/component-updates/command-line-process-auditing). To help protect secrets, consider using environment variables, `STDIN`, or other mechanisms supported by the target process.

If you must pass secrets within a command line, then enclose them within the proper quoting rules. Secrets often contain special characters that may unintentionally affect your shell. To escape these special characters, use quoting with your environment variables. For example:

### Example using Bash

```yaml
steps:
  - shell: bash
    env:
      SUPER_SECRET: ${{ secrets.SuperSecret }}
    run: |
      example-command "$SUPER_SECRET"
```

### Example using PowerShell

```yaml
steps:
  - shell: pwsh
    env:
      SUPER_SECRET: ${{ secrets.SuperSecret }}
    run: |
      example-command "$env:SUPER_SECRET"
```

### Example using Cmd.exe

```yaml
steps:
  - shell: cmd
    env:
      SUPER_SECRET: ${{ secrets.SuperSecret }}
    run: |
      example-command "%SUPER_SECRET%"
```

## Limits for secrets

You can store up to 1,000 organization secrets, 100 repository secrets, and 100 environment secrets.

A workflow created in a repository can access the following number of secrets:

* All 100 repository secrets.
* If the repository is assigned access to more than 100 organization secrets, the workflow can only use the first 100 organization secrets (sorted alphabetically by secret name).
* All 100 environment secrets.

Secrets are limited to 64 KB in size. To store larger secrets, see the "[Storing large secrets](https://docs.github.com/cn/actions/security-guides/encrypted-secrets#storing-large-secrets)" workaround below.

### Storing large secrets

To use secrets that are larger than 64 KB, you can use a workaround to store encrypted secrets in your repository and save the decryption passphrase as a secret on GitHub. For example, you can use `gpg` to encrypt a file containing your secret locally before checking the encrypted file in to your repository on GitHub. For more information, see the "[gpg manpage](https://www.gnupg.org/gph/de/manual/r1023.html)."

 **Warning** : Be careful that your secrets do not get printed when your workflow runs. When using this workaround, GitHub does not redact secrets that are printed in logs.

1. Run the following command from your terminal to encrypt the file containing your secret using `gpg` and the AES256 cipher algorithm. In this example, `my_secret.json` is the file containing the secret.

   ```bash
   gpg --symmetric --cipher-algo AES256 my_secret.json
   ```
2. You will be prompted to enter a passphrase. Remember the passphrase, because you'll need to create a new secret on GitHub that uses the passphrase as the value.
3. Create a new secret that contains the passphrase. For example, create a new secret with the name `LARGE_SECRET_PASSPHRASE` and set the value of the secret to the passphrase you used in the step above.
4. Copy your encrypted file to a path in your repository and commit it. In this example, the encrypted file is `my_secret.json.gpg`.
   **Warning** : Make sure to copy the encrypted `my_secret.json.gpg` file ending with the `.gpg` file extension, and **not** the unencrypted `my_secret.json` file.

   ```bash
   git add my_secret.json.gpg
   git commit -m "Add new encrypted secret JSON file"
   ```
5. Create a shell script in your repository to decrypt the secret file. In this example, the script is named `decrypt_secret.sh`.

   ```bash
   #!/bin/sh

   # Decrypt the file
   mkdir $HOME/secrets
   # --batch to prevent interactive command
   # --yes to assume "yes" for questions
   gpg --quiet --batch --yes --decrypt --passphrase="$LARGE_SECRET_PASSPHRASE" \
   --output $HOME/secrets/my_secret.json my_secret.json.gpg
   ```
6. Ensure your shell script is executable before checking it in to your repository.

   ```bash
   chmod +x decrypt_secret.sh
   git add decrypt_secret.sh
   git commit -m "Add new decryption script"
   git push
   ```
7. In your GitHub Actions workflow, use a `step` to call the shell script and decrypt the secret. To have a copy of your repository in the environment that your workflow runs in, you'll need to use the [`actions/checkout`](https://github.com/actions/checkout) action. Reference your shell script using the `run` command relative to the root of your repository.

   ```yaml
   name: Workflows with large secrets

   on: push

   jobs:
     my-job:
       name: My Job
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Decrypt large secret
           run: ./decrypt_secret.sh
           env:
             LARGE_SECRET_PASSPHRASE: ${{ secrets.LARGE_SECRET_PASSPHRASE }}
         # This command is just an example to show your secret being printed
         # Ensure you remove any print statements of your secrets. GitHub does
         # not hide secrets that use this workaround.
         - name: Test printing your secret (Remove this step in production)
           run: cat $HOME/secrets/my_secret.json
   ```

## Storing Base64 binary blobs as secrets
You can use Base64 encoding to store small binary blobs as secrets. You can then reference the secret in your workflow and decode it for use on the runner. For the size limits, see [&#34;Limits for secrets&#34;](https://docs.github.com/cn/actions/security-guides/encrypted-secrets#limits-for-secrets).

 **Note** : Note that Base64 only converts binary to text, and is not a substitute for actual encryption.

1. Use `base64` to encode your file into a Base64 string. For example:
   ```
   $ base64 -i cert.der -o cert.base64
   ```
2. Create a secret that contains the Base64 string. For example:
   ```
   $ gh secret set CERTIFICATE_BASE64 < cert.base64
   ✓ Set secret CERTIFICATE_BASE64 for octocat/octorepo
   ```
3. To access the Base64 string from your runner, pipe the secret to `base64 --decode`. For example:
   ```yaml
   name: Retrieve Base64 secret
   on:
     push:
       branches: [ octo-branch ]
   jobs:
     decode-secret:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - name: Retrieve the secret and decode it to a file
           env:
             CERTIFICATE_BASE64: ${{ secrets.CERTIFICATE_BASE64 }}
           run: |
             echo $CERTIFICATE_BASE64 | base64 --decode > cert.der
         - name: Show certificate information
           run: |
             openssl x509 -in cert.der -inform DER -text -noout
   ```

  ### 测试往服务器上添加私密信息
  ```
name: test secert and ssh actions
on: [push]

jobs:
  SECRET-SSH-ACTIONS:
    runs-on: ubuntu-latest
    steps:
      - uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.KEY }}
          script_stop: true
          script: |
            pwd
            ls -l
            touch secret.txt
            echo ${{ secrets.MY_SECRET }} >> secret.txt
  ```
